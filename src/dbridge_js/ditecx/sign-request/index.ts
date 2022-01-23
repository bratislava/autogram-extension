import {
  ObjectStrategy,
  XadesBpPngStrategy,
  XadesBpTxtStrategy,
  XadesBpXmlStrategy,
  XadesPdfStrategy,
  XadesXmlStrategy,
} from "./strategy";
import {
  InputObject,
  PartialSignerParameters,
  FullSignerParameters,
} from "./types";
export { InputObject, PartialSignerParameters } from "./types";
export class SignRequest {
  object: InputObject;
  objectInfo: ObjectStrategy;

  signatureId: string;
  digestAlgUri: string;
  signaturePolicyIdentifier: string;
  signStarted = false;

  // objects = [];
  // get object(): InputObject {
  //   return this.objects[0];
  // }

  addObject(obj: InputObject): void {
    if (this.object && !this.signStarted) {
      console.log("ERROR: overwriting unsigned object");
    }
    this.object = obj;
    this.objectInfo = this.getObjectInfo();
  }

  signatureParameters(params: PartialSignerParameters): FullSignerParameters {
    return {
      identifier: this.objectInfo.identifier,
      version: this.objectInfo.formVersion,
      format: params.format || "XADES",
      level: params.level || "XADES_BASELINE_B",
      fileMimeType:
        params.fileMimeType ||
        "application/vnd.gov.sk.xmldatacontainer+xml; charset=UTF-8",
      container: params.container || "ASICE",
      containerFilename: params.containerFilename || this.object.objectId,
      containerXmlns:
        params.containerXmlns ||
        "http://data.gov.sk/def/container/xmldatacontainer+xml/1.1",
      packaging: params.packaging || "ENVELOPING",
      digestAlgorithm: params.digestAlgorithm || "SHA256",
      en319132: params.en319132 || false,
      infoCanonicalization: params.infoCanonicalization || "INCLUSIVE",
      propertiesCanonicalization:
        params.propertiesCanonicalization || "INCLUSIVE",
      keyInfoCanonicalization: params.keyInfoCanonicalization || "INCLUSIVE",
      signaturePolicyId:
        params.signaturePolicyId || "http://www.example.com/policy.txt",
      signaturePolicyContent: params.signaturePolicyContent || "Don't be evil.",
      transformation: this.objectInfo.objTransformation,
      transformationOutputMimeType:
        params.transformationOutputMimeType || "text/plain",
      schema: this.objectInfo.objSchema,
    };
  }

  getObjectInfo() {
    const obj = this.object;
    switch (obj.type) {
      case "XadesBpXml":
        return new XadesBpXmlStrategy(obj);

      case "XadesXml":
      case "Xades2Xml":
        return new XadesXmlStrategy(obj);

      case "XadesPdf":
      case "XadesBpPdf":
        return new XadesPdfStrategy(obj);

      case "XadesBpPng":
      case "XadesPng":
        return new XadesBpPngStrategy(obj);

      case "XadesBpTxt":
        return new XadesBpTxtStrategy(obj);

      default:
        throw new Error("failed");
    }
  }

  get document() {
    return this.objectInfo.document;
  }

  get payloadMimeType() {
    return this.objectInfo.payloadMimeType;
  }
}

// function assertUnreachable(x: never): never {
//   throw new Error("Didn't expect to get here");
// }

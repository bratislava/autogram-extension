import { apiClient, SignatureParameters, Document } from "@octosign/client";

export interface SignerRequest {
  document: Document;
  parameters: {
    identifier: null | string;
    version: null | string;
    format: "PADES" | "XADES";
    level: "PADES_BASELINE_B" | "XADES_BASELINE_B";
    fileMimeType: null | string;
    container: null | "ASICE" | "ASICS";
    packaging: "ENVELOPED" | "ENVELOPING" | "DETACHED" | "INTERNALLY_DETACHED";
    digestAlgorithm: "SHA256" | "SHA384" | "SHA512";
    en319132: false;
    infoCanonicalization: null | "INCLUSIVE" | "EXCLUSIVE";
    propertiesCanonicalization: null | "INCLUSIVE" | "EXCLUSIVE";
    keyInfoCanonicalization: null | "INCLUSIVE" | "EXCLUSIVE";
    signaturePolicyId: null | string;
    signaturePolicyContent: null | string;
    transformation: null | string;
    schema: null | string;
  };
  payloadMimeType: "application/pdf;base64" | "application/xml" | string;
  hmac: "string";
}

export type SignerResponse = Document;

export class SignerClient {
  // constructor() {}

  private client: ReturnType<typeof apiClient>;

  constructor() {
    this.client = apiClient();
  }

  public async sign(requestBody: SignerRequest): Promise<SignerResponse> {
    this.client.getLaunchURL();
    await this.client.waitForStatus("READY");
    const document: Document = requestBody.document;
    const signParams: SignatureParameters= requestBody.parameters;

    return this.client.sign(document, signParams, requestBody.payloadMimeType);
  }
}




/*
@octosign/client

Exportovat viacero typov napr.:
client: ReturnType<typeof apiClient>;



*/
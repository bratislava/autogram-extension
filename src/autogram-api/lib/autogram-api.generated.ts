/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/info": {
    /** Retrieve info and the current server status */
    get: operations["getInfo"];
  };
  "/sign": {
    /** Sign a single document */
    post: operations["signDocument"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Info: {
      /** @example 1.2.3 */
      version?: string;
      /** @enum {string} */
      status?: "LOADING" | "READY";
    };
    SignRequestBody: {
      document: components["schemas"]["Document"];
      parameters: components["schemas"]["SignatureParameters"];
      /**
       * @description MIME type for document content and signature parameters like transformation and schema.
       * Binary files should be encoded using base64, e.g., `application/pdf;base64`.
       * Text formats like XML can be optionally encoded using base64 but can be supplied as plain text as seen in the examples, in which case the type is `application/xml`.
       *  
       * @example application/xml
       */
      payloadMimeType: string;
    };
    Document: {
      /**
       * @description Filename of the original file to be signed. Is used to name the file inside ASiC container. If not provided with ASiC container, the file is named `detached-file` inside the container. 
       * @example document.xml
       */
      filename?: string;
      /**
       * @description Content of the document to sign, format is dictated by `payloadMimeType`. 
       * @example <?xml version="1.0"?><Document><Title>Lorem Ipsum</Title></Document>
       */
      content: string;
    };
    SignResponseBody: {
      /**
       * @description Signed content of the original document in Base64 format. 
       * @example TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvQDSdd57FueSBoYW5kcyBtYWtlIGxpZ2h0IHdvsRWdaAeSBoYW5kcyBtYW==
       */
      content: string;
      /**
       * @description Distinguished name of the certificate used/attempting to sign the document. 
       * @example SERIALNUMBER=PNOSK-1234567890, C=SK, L=Bratislava, SURNAME=Smith, GIVENNAME=John, CN=John Smith
       */
      signedBy: string;
      /**
       * @description Distinguished name of the issuer of the certificate used/attempting to sign the document. 
       * @example CN=SVK eID ACA2, O=Disig a.s., OID.2.5.4.97=NTRSK-12345678, L=Bratislava, C=SK
       */
      issuedBy: string;
    };
    SignatureParameters: {
      /** @description Check for PDF/A compliance and show warning if not compliant. */
      checkPDFACompliance?: boolean;
      /**
       * @description Signature format PAdES is usable only with documents of type `application/pdf`. Format XAdES is usable with XML or with any file type if using an ASiC container. 
       * @example XAdES_BASELINE_B 
       * @enum {string}
       */
      level: "XAdES_BASELINE_B" | "PAdES_BASELINE_B" | "CAdES_BASELINE_B";
      /**
       * @description Optional container type that should be used to place the file with signature to. 
       * @example ASiC_E 
       * @enum {string}
       */
      container?: "ASiC_S" | "ASiC_E";
      /**
       * @description XML namespace for the ASiC container. Specifies if xmldatacontainer should be created from XML. Doesn't create xmldatacontainer if payloadMimeType application/vnd.gov.sk.xmldatacontainer+xml already. Accepts http://data.gov.sk/def/container/xmldatacontainer+xml/1.1 only. 
       * @example http://data.gov.sk/def/container/xmldatacontainer+xml/1.1 
       * @enum {string}
       */
      containerXmlns?: "http://data.gov.sk/def/container/xmldatacontainer+xml/1.1";
      /**
       * @description Optional identifier of the document template. Required if containerXmlns is http://data.gov.sk/def/container/xmldatacontainer+xml/1.1. 
       * @example https://data.gov.sk/id/egov/eform/App.GeneralAgenda/1.9
       */
      identifier?: string;
      /**
       * @description Optional form of packaging used with XML. ENVELOPED adds the signature as a child of the root element while ENVELOPING wraps the XML in a new element. Defaults to ENVELOPED. Only applies to XAdES signatures. Must be ENVELOPING when used without ASiC container and with non XML documents. 
       * @example ENVELOPED 
       * @enum {string}
       */
      packaging?: "ENVELOPED" | "ENVELOPING";
      /**
       * @description Optional algorithm used to calculate digests. Defaults to SHA256. 
       * @example SHA256 
       * @enum {string}
       */
      digestAlgorithm?: "SHA256" | "SHA384" | "SHA512";
      /**
       * @description Optional flag to control whether the signature should be made according to EN 319132. Defaults to true. 
       * @example false
       */
      en319132?: boolean;
      /**
       * @description Optional info canonicalization method. 
       * @example INCLUSIVE 
       * @enum {string}
       */
      infoCanonicalization?: "INCLUSIVE" | "EXCLUSIVE" | "INCLUSIVE_WITH_COMMENTS" | "EXCLUSIVE_WITH_COMMENTS" | "INCLUSIVE_11" | "INCLUSIVE_11_WITH_COMMENTS";
      /**
       * @description Optional properties canonicalization method. 
       * @example INCLUSIVE 
       * @enum {string}
       */
      propertiesCanonicalization?: "INCLUSIVE" | "EXCLUSIVE" | "INCLUSIVE_WITH_COMMENTS" | "EXCLUSIVE_WITH_COMMENTS" | "INCLUSIVE_11" | "INCLUSIVE_11_WITH_COMMENTS";
      /**
       * @description Optional key info canonicalization method. 
       * @example INCLUSIVE 
       * @enum {string}
       */
      keyInfoCanonicalization?: "INCLUSIVE" | "EXCLUSIVE" | "INCLUSIVE_WITH_COMMENTS" | "EXCLUSIVE_WITH_COMMENTS" | "INCLUSIVE_11" | "INCLUSIVE_11_WITH_COMMENTS";
      /**
       * @description Optional XML schema. Format is dictated by `payloadMimeType`. 
       * @example <?xml version="1.0"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Document"><xs:complexType><xs:sequence><xs:element name="Title" type="xs:string" /></xs:sequence></xs:complexType></xs:element></xs:schema>
       */
      schema?: string;
      /**
       * @description Optional XML transformation used to . Format is dictated by `payloadMimeType`. 
       * @example <?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match = "/"><h1><xsl:value-of select="/Document/Title"/></h1></xsl:template></xsl:stylesheet>
       */
      transformation?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /** Retrieve info and the current server status */
  getInfo: {
    responses: {
      /** @description successful operation */
      200: {
        content: {
          "application/json": components["schemas"]["Info"];
        };
      };
    };
  };
  /** Sign a single document */
  signDocument: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["SignRequestBody"];
      };
    };
    responses: {
      /** @description The document was successfully signed and its content is available in the response body. */
      200: {
        content: {
          "application/json": components["schemas"]["SignResponseBody"];
        };
      };
      /** @description The document was not signed because the user cancelled the signing process. */
      204: never;
      /** @description The request body cannot be processed. */
      400: {
        content: {
          "application/json": {
            /**
             * @description Code that can be used to identify the error. 
             * @example MALFORMED_INPUT 
             * @enum {string}
             */
            code?: "MALFORMED_INPUT";
            /**
             * @description Human readable error message. 
             * @example JsonSyntaxException parsing request body.
             */
            message?: string;
            /**
             * @description Optional details. 
             * @example JsonSyntaxException: Unexpected token END OF FILE at position 0.
             */
            details?: string;
          };
        };
      };
      /** @description The request body is valid but the document cannot be signed. */
      422: {
        content: {
          "application/json": {
            /**
             * @description Code that can be used to identify the error. 
             * @example UNPROCESSABLE_INPUT 
             * @enum {string}
             */
            code?: "UNPROCESSABLE_INPUT" | "UNSUPPORTED_SIGNATURE_LEVEL";
            /**
             * @description Human readable error message. 
             * @example IllegalArgumentException parsing request body
             */
            message?: string;
            /**
             * @description Optional details. 
             * @example PayloadMimeType must be PDF when using PAdES.
             */
            details?: string;
          };
        };
      };
      /** @description Request failed due to some unexpected error. */
      500: {
        content: {
          "application/json": {
            /**
             * @example INTERNAL_ERROR 
             * @enum {string}
             */
            code?: "INTERNAL_ERROR";
            /**
             * @description Human readable error message. 
             * @example Unexpected exception signing document
             */
            message?: string;
            /**
             * @description Optional details. 
             * @example java.lang.NullPointerException: null
             */
            details?: string;
          };
        };
      };
      /** @description Request failed due to an error with the signing process. */
      502: {
        content: {
          "application/json": {
            /**
             * @description Code that can be used to identify the error. 
             * @example UNRECOGNIZED_DSS_ERROR 
             * @enum {string}
             */
            code?: "UNRECOGNIZED_DSS_ERROR" | "SIGNING_FAILED";
            /**
             * @description Human readable error message. 
             * @example Unable to sign document
             */
            message?: string;
            /**
             * @description Optional details. 
             * @example no such algorithm: PKCS11 for provider
             */
            details?: string;
          };
        };
      };
    };
  };
}

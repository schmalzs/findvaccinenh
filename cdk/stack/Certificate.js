const certificatemanager = require('@aws-cdk/aws-certificatemanager');

const { DOMAIN_NAME } = process.env;

class Certificate extends certificatemanager.Certificate {
  constructor(scope) {
    if (!DOMAIN_NAME) {
      throw new Error('Missing DOMAIN_NAME environment variable');
    }

    super(scope, 'FindVaccineNHCertificate', {
      domainName: DOMAIN_NAME,
      subjectAlternativeNames: [`*.${DOMAIN_NAME}`],
      validationMethod: certificatemanager.ValidationMethod.DNS,
    });

    // Escape hatch due to this issue: https://github.com/aws/aws-cdk/issues/7933
    this.node.defaultChild.domainValidationOptions = undefined;
  }
}

module.exports = Certificate;

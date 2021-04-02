const fs = require('fs');
const _ = require('lodash');
const yaml = require('yaml');

const TEMPLATE = 'template.yaml';
const DOT_ENV = '.env';
const TEMPLATE_OUTPUT = 'template-generated.yaml';

const getTemplateJson = () => yaml.parse(fs.readFileSync(TEMPLATE, 'utf8'));

const getEnvVarJson = () => {
  const data = fs.readFileSync(DOT_ENV, 'utf8').split(/[\n]/);
  return data.reduce((result, line) => {
    if (line.startsWith('#')) return result;

    const equalsIndex = line.indexOf('=');
    let key = line.substring(0, equalsIndex);
    let value = line.substring(equalsIndex + 1);

    if (!key || !value) return result;

    key = key.trim();
    value = value.trim();

    value = value.replace(/\\n/g, '\n');

    if (value.startsWith("'") || value.startsWith('"')) {
      value = value.slice(1, -1);
    }

    return { ...result, [key]: value };
  }, {});
};

const templateJson = getTemplateJson();
templateJson.Resources = _.mapValues(templateJson.Resources, (Resource) => ({
  ...Resource,
  Properties: {
    ...Resource.Properties,
    Environment: { Variables: getEnvVarJson() },
  },
}));

fs.writeFileSync(TEMPLATE_OUTPUT, yaml.stringify(templateJson), 'utf8');

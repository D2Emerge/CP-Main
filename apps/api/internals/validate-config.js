const yup = require('yup');

const configSchema = yup.object().shape({
  mode: yup.string().required(),
  port: yup.number().required(),
});

const config = require(`../config/${process.env.config || 'local'}.json`);

configSchema
  .validate(config)
  .then(() => {
    console.info('Config looks good ✅');
  })
  .catch(err => {
    console.error(
      err.errors || 'One of config params are not present, shutting down ❌'
    );
    process.exit(9);
  });

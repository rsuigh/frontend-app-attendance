import { getConfig } from '@edx/frontend-platform';
import { setConfig } from '@edx/frontend-platform';

setConfig({ 
    ...getConfig(),
    CMS_BASE_URL: process.env.CMS_BASE_URL, // This is overriding the ENTIRE document - this is not merged in!
});

export { getConfig }
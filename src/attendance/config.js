import { getConfig } from '@edx/frontend-platform';
import { setConfig } from '@edx/frontend-platform';

setConfig({ 
    ...getConfig(), 
    ATTENDANCE_URL: process.env.ATTENDANCE_URL, // This is overriding the ENTIRE document - this is not merged in!
});

export { getConfig }
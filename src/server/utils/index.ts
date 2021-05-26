export const env = (key: string):string => {
    const value = process.env[key];
    if(!value) throw new Error(`Missing: process.env['${key}'].`);
    return value;
}
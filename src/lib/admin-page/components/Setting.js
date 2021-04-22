const Setting = (setting) => (<li>{ Object.keys(setting)[0] }: {setting[Object.keys(setting)[0]]}</li>)
export default Setting;

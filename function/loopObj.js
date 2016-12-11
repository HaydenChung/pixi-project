export default function loopObj (args,callback) {
    let result={};
    Object.keys(args).forEach((key) => {
        if(typeof args[key] != 'object') result[key] = callback(args[key],key);
            else result[key] = loopObj(args[key],callback);  
        });
    return result;
}
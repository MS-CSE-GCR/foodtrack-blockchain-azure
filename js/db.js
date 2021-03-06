const localdb = {
    account:[],
}
const debug=function(msg) {
    console.log(msg)
}
class localdbHelper {
    
    static queryAccount(usr, pwd) {
        for(let account of localdb.account) {
            if(account.usr===usr && account.pwd===pwd) {
                debug(JSON.stringify(account));
                return account;
            }
        }
        return null
    }
    
    static addAccount(acc) {
        for(let account of localdb.account) {
            if(account.usr===acc.usr) {
                return null;
            }
        }
        // const acc = {usr:usr,pwd:pwd,type:type};
        localdb.account.push(acc)
        debug(JSON.stringify(localdb));
        return acc;
    }

    static addFarmOperator(farmName, opt) {
        for(let account of localdb.account) {
            if(account.usr===farmName) {
                account.farm_operator = account.farm_operator || [];
                account.farm_operator.push({name: opt.name, desc: opt.desc})
                return account;
            }
        }
    }

    static listFarmOperator(farmName) {
        for(let account of localdb.account) {
            if(account.usr===farmName) {
                account.farm_operator = account.farm_operator || [];
                return account.farm_operator;
            }
        }
    }
}
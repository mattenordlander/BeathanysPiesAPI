let fs = require('fs');
let uuid = require('uuid')
const FILE_NAME = './assets/pies.json';
let pieRepo = {
    // Function with 2 callbacks
    get:function(resolve, reject){
        // readFiles first arguement passes that content to the callback function provided as the second argument for "data"
    fs.readFile(FILE_NAME, function(err, data){
        if(err){
            reject(err)
        }
        else{
            resolve(JSON.parse(data))
        }
    });
    },
    getById: function (id,resolve,reject) {
        fs.readFile(FILE_NAME,function (err,data){
            if(err){
                reject(err)
            }
            else{
                let pie = JSON.parse(data).find(p => p.id ==id);
                resolve(pie)
            }
        })
    },
    search: function(searchObject, resolve,reject){
        fs.readFile(FILE_NAME, function(err,data){
            if(err){
                reject(err)
            }
            else{
                let pies = JSON.parse(data);

                if(searchObject){
                pies = pies.filter(
                    p => (searchObject.id ? p.id == searchObject.id : true) &&
                    (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >=0 : true));
                }
                resolve(pies)
            }
        })
    },
    insert: function(newData,resolve,reject){
        fs.readFile(FILE_NAME,function(err,data){
            if(err){
                reject(err);
            }
            else{
                let pies = JSON.parse(data);
                if(!newData.id){
                    newData.id = uuid.v4();
                }
                pies.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(newData);
                    }
                });
            }
        });
    },
    update:function(newData,id,resolve,reject){
        fs.readFile(FILE_NAME,function(err,data){
            if(err){
                reject(err);
            }
            else{
                let pies = JSON.parse(data);
                let pie = pies.find(p => p.id == id);
                if(pie){
                    Object.assign(pie,newData);
                    fs.writeFile(FILE_NAME,JSON.stringify(pies), function(err){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(newData);
                        }
                    });
                }
            }
        });
    },
    delete:function(id,resolve,reject){
        fs.readFile(FILE_NAME,function(err,data){
            if(err){
                reject(err)
            }
            else{
                let pies = JSON.parse(data);
                let index = pies.findIndex(p => p.id == id);
                if(index != -1){
                    pies.splice(index,1);
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(index);
                        }
                    });

                }
            }
        });
    }
};

module.exports = pieRepo;
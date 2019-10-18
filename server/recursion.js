const data = {
    'name':'akshay',
    'talent':[
            {
                'wrestling':[
                    {
                        'ufc':'yes',
                        'wwe':'yes'
                    },
                    {
                        'mma':'yes'
                    }
                ]
            },
            {
                'technical':[
                    {
                        'programming':[
                            {
                                'c':'yes'
                            },
                            {
                                'java':'yes'
                            },
                            {
                                'javaScript':'yes'
                            }
                        ]                    
                    },
                    {
                        'devops':'yes'
                    },
                    {
                        'cloud':'yes'
                    }
                ]
            }
    ],
    'loveable':'yes',
    'obj':{
        'first':'first',
        'array':[
            {
                'fields':{
                    'one':'one',
                    'two':'two',
                }
            }
        ]
    }
}

const parseObject = (obj) => {

    let json = JSON.stringify(obj)
    let parsed = JSON.parse(json)
    return parsed

}

var simpleresult = {};

const handleArray = (data) => {
    
    data.forEach(key => {
        if(typeof key === 'object') handleObject(key)
    })
}

const transformJSON = (data) => {
    let vals =  Object.keys(data).map(key => 
       { 
        if(Array.isArray(data[key])) handleArray(data[key]);
        else if(typeof data[key] === 'object') handleObject(data[key]);
        else {
            simpleresult[key] =  data[key]
            return data[key]
        }
    });
    
}



const handleObject = (obj) => {
   let parsed = parseObject(obj);
  // console.log(parsed)
   transformJSON(parsed);
}

let initialdata = parseObject(data);
transformJSON(initialdata);
console.log(simpleresult);
import Mock from 'mockjs2'
import { builder } from '../util';

const staffSheet = () =>{
    return{
        'data':[
        {
            'id':'STF15000001',
            'name':'昆坤',
            'accountID':'12345',
            'password':'12345678',
            'status':'0',
            'detail':[{
                'roleName':'电话号码',
                'var':'12345678911',
            },
            {
                'roleName':'身份证号码',
                'var':'110110199901010000',
            },
            {
                'roleName':'账户创建时间',
                'var':'2019-01-01 06:32:50',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2019-01-02 11:40:07',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周一',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周五'
            }]
        },
        {
            'id':'STF15000003',
            'name':'蔡才',
            'accountID':'76543',
            'password':'12345673',
            'status':'0',
            'detail':[{
                'roleName':'电话号码',
                'var':'98765432134',
            },
            {
                'roleName':'身份证号码',
                'var':'110110199901012548',
            },
            {
                'roleName':'账户创建时间',
                'var':'2017-12-01 12:44:55',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2019-01-02 05:42:10',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周二',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周五'
            }]
        },
        {
            'id':'STF15000013',
            'name':'徐绪',
            'accountID':'6543217',
            'password':'76543213',
            'status':'1',
            'detail':[{
                'roleName':'电话号码',
                'var':'89765412345',
            },
            {
                'roleName':'身份证号码',
                'var':'110110199901017458',
            },
            {
                'roleName':'账户创建时间',
                'var':'2018-07-31 08:31:44',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2018-10-02 09:01:20',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周一',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周日'
            }]
        },
        {
            'id':'STF15000017',
            'name':'常迢',
            'accountID':'56741',
            'password':'43217654',
            'status':'2',
            'detail':[{
                'roleName':'电话号码',
                'var':'56437892165',
            },
            {
                'roleName':'身份证号码',
                'var':'110110199901013458',
            },
            {
                'roleName':'账户创建时间',
                'var':'2016-11-21 10:23:23',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2018-04-02 04:05:04',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'6',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'5'
            }]
        }
    ]
}

}

const staffSheetDelete = (data) =>{
    console.log("data:",data)
    var text = String(data.body)
    console.log("id",text)
    let sfData = {
        'STF15000001':[
        {
            'id':'STF15000003',
            'name':'蔡才',
            'accountID':'76321',
            'password':'1234567',
            'status':'0',
            'detail':[{
                'roleName':'电话号码',
                'var':'987654321',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100002548',
            },
            {
                'roleName':'账户创建时间',
                'var':'2017-12-01 12:44:55',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2019-01-02 05:42:10',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周二',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周五'
            }]
        },
        {
            'id':'STF15000013',
            'name':'徐绪',
            'accountID':'6543217',
            'password':'7654321',
            'status':'1',
            'detail':[{
                'roleName':'电话号码',
                'var':'897654123',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100007458',
            },
            {
                'roleName':'账户创建时间',
                'var':'2018-07-31 08:31:44',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2018-10-02 09:01:20',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周一',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周日'
            }]
        },
        {
            'id':'STF15000017',
            'name':'常迢',
            'accountID':'5674123',
            'password':'4321765',
            'status':'2',
            'detail':[{
                'roleName':'电话号码',
                'var':'564378921',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100003458',
            },
            {
                'roleName':'账户创建时间',
                'var':'2016-11-21 10:23:23',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2018-04-02 04:05:04',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'6',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'5'
            }]
        }],
        'STF15000003':[
            {
            'id':'STF15000001',
            'name':'昆坤',
            'accountID':'1234567',
            'password':'1234567',
            'status':'0',
            'detail':[{
                'roleName':'电话号码',
                'var':'123456789',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100000000',
            },
            {
                'roleName':'账户创建时间',
                'var':'2019-01-01 06:32:50',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2019-01-02 11:40:07',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周一',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周五'
            }]
        },
        {
            'id':'STF15000017',
            'name':'常迢',
            'accountID':'5674123',
            'password':'4321765',
            'status':'2',
            'detail':[{
                'roleName':'电话号码',
                'var':'564378921',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100003458',
            },
            {
                'roleName':'账户创建时间',
                'var':'2016-11-21 10:23:23',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2018-04-02 04:05:04',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'6',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'5'
            }]
        }],
        'STF15000017':[
            {
            'id':'STF15000001',
            'name':'昆坤',
            'accountID':'1234567',
            'password':'1234567',
            'status':'0',
            'detail':[{
                'roleName':'电话号码',
                'var':'123456789',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100000000',
            },
            {
                'roleName':'账户创建时间',
                'var':'2019-01-01 06:32:50',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2019-01-02 11:40:07',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周一',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周五'
            }]
        },
        {
            'id':'STF15000003',
            'name':'蔡才',
            'accountID':'7654321',
            'password':'1234567',
            'status':'0',
            'detail':[{
                'roleName':'电话号码',
                'var':'987654321',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100002548',
            },
            {
                'roleName':'账户创建时间',
                'var':'2017-12-01 12:44:55',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2019-01-02 05:42:10',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周二',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周五'
            }]
        },
        {
            'id':'STF15000013',
            'name':'徐绪',
            'accountID':'6543217',
            'password':'7654321',
            'status':'1',
            'detail':[{
                'roleName':'电话号码',
                'var':'897654123',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100007458',
            },
            {
                'roleName':'账户创建时间',
                'var':'2018-07-31 08:31:44',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2018-10-02 09:01:20',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周日',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周五'
            }]
        }],
        'STF15000013':[
            {
            'id':'STF15000001',
            'name':'昆坤',
            'accountID':'1234567',
            'password':'1234567',
            'status':'0',
            'detail':[{
                'roleName':'电话号码',
                'var':'123456789',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100000000',
            },
            {
                'roleName':'账户创建时间',
                'var':'2019-01-01 06:32:50',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2019-01-02 11:40:07',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周一',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周五'
            }]
        },
        {
            'id':'STF15000003',
            'name':'蔡才',
            'accountID':'7654321',
            'password':'1234567',
            'status':'0',
            'detail':[{
                'roleName':'电话号码',
                'var':'987654321',
            },
            {
                'roleName':'身份证号码',
                'var':'1101101999010100002548',
            },
            {
                'roleName':'账户创建时间',
                'var':'2017-12-01 12:44:55',
            },
            {
                'roleName':'账户最近修改时间',
                'var':'2019-01-02 05:42:10',
            },
            {
                'roleName':'每周工作开始时间',
                'var':'周二',
            },
            {
                'roleName':'每周工作结束时间',
                'var':'周五'
            }]
        }],
    }
    let info = 'ok'
    return{
        'data':{
            sfData: sfData[data.body]
        },
        'info':info
    }
    
}

const staffSheetModify = (data) =>{
    console.log("data:",data)
    var text = String(data.body)
    console.log("body",text)
    let msfData = {
        
    }
    let  info = 'ok'
    return{
        'data':{
            msfData: msfData[data.body]
        },
        'info':info
    }
    
}

const staffSheetAdd = (data) =>{
    console.log("data:",data)
    var text = String(data.body)
    console.log("body",text)
    let asfData = {
        
    }
    let  info1 = 'ok'
    let info2 = '123jxh'
    return{
        'data':{
            asfData: asfData[data.body],
        },
        'info1':info1,
        'info2':info2
    }
    
}

Mock.mock(/\/staff\/staffSheet/, 'get', staffSheet)
Mock.mock(/\/staff\/staffSheetDelete/, 'post', staffSheetDelete)
Mock.mock(/\/staff\/staffSheetModify/, 'post', staffSheetModify)
Mock.mock(/\/staff\/staffSheetAdd/, 'post', staffSheetAdd)
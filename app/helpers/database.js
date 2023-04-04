import SQLite from 'react-native-sqlite-storage'
import localKeys from './local-storage-keys'
import AsyncStorage from "@react-native-community/async-storage"
import moment from 'moment'

export const exState = SQLite.openDatabase({ name: 'exState.db', createFromLocation: 1 }, successCB, errorcb);
export const ex = SQLite.openDatabase({ name: 'ex_db.db', createFromLocation: 1 }, successCB, errorcb);
export const axDb = SQLite.openDatabase({ name: 'ax.db', createFromLocation: 1 }, successCB, errorcb);


function errorcb(err) {

}

function successCB() {

}

function openCB() {

}


export const Query = (db, query) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                resolve({ result: true, data: temp })
            },
                (err) => {
                    resolve({ result: false, err })
                }
            )
        })
    })
}

export const SqlQuery = () => {
    const db = ex
    const query = "SELECT * from ex ORDER BY NAME"
    return Query(db, query)
}

export const getMealDay = () => {
    const db = axDb
    const query = "SELECT * FROM \"6Pack\";"
    return Query(db, query)
}

export const getCurrentDay = (changeDayValue = null) => {
    return new Promise((resolve, reject) => {
        console.log({changeDayValue})
        if (changeDayValue) {
            setCurrentDay(changeDayValue)
            resolve({ result: true, data: changeDayValue })
        } else {
            AsyncStorage.getItem(localKeys.currentDay)
                .then(async (data) => {                  
                    if (data == 0 || data) {
                        const restDate = await AsyncStorage.getItem(localKeys.restDate)
                        const isSkip = restDate && restDate < moment().format('YYYY-MM-DD');                       
                        if (isSkip) {
                            const nextDate = parseInt(data) + 1
                            setCurrentDay(nextDate);
                            await AsyncStorage.removeItem(localKeys.restDate)
                            resolve({ result: true, data: nextDate })
                        } else {
                            resolve({ result: true, data: parseInt(data) })
                        }
                    } else {
                        setCurrentDay(1)
                        resolve({ result: true, data: 1 })
                    }
                }).catch(err => {
                    setCurrentDay(1)
                    resolve({ result: true, data: 1 })
                })
        }
    })
}

export const setCurrentDay = (value) => {
    return new Promise(async (resolve, reject) => {
        await AsyncStorage.setItem(localKeys.currentDay, `${value}`)
        resolve({ result: true })
    })
}



export const getAllDays = () => {
    const db = ex
    const query = "select * from days order by id"
    return Query(db, query)
}

export const getExercises = () => {
    const db = ex
    const query = "SELECT * from ex ORDER BY NAME"
    return Query(db, query)
}
export const queryExercise = (queryString) => {
    const db = ex
    return Query(db, queryString)
}

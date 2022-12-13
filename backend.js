const express = require ('express')
const mysql = require ('mysql')

const app = express()

const conexionBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'challenge5'
})

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });


app.get('/autos', (req,res) => {
    const sql = 'SELECT * FROM challenge5.autos'

    conexionBD.query(sql,(err,results) =>{
        if(err) throw err;
        if (results.length > 0){
            res.json(results)
        } else {
            res.send('No hay datos')
        }
    })
})

app.get('/autos/:idautos', (req,res) => {
    const id = req.params
    const sql =`SELECT * FROM challenge5.autos WHERE idautos = ${id.idautos}`

    conexionBD.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('Error al buscar auto')
        }
    } )
})

app.post('/agregar-auto',(req,res)=>{
    const sql='INSERT INTO challenge5.autos SET ?'

    const crearAuto = {
        idautos: req.body.idautos,
        nombre_vehiculos: req.body.nombre_vehiculos,
        año_fabricacion : req.body.año_fabricacion,
        precio: req.body.precio,
        cantidad: req.body.cantidad
    }

    conexionBD.query(sql,crearAuto, err =>{
        if (err) throw err

        res.send('Auto añadido')
        
    })

})

app.put('/actualizar-auto/:idautos', (req,res) => {
    const id = req.params
    const {nombre,fecha_fabricacion,valor,cantidad} = req.body
    const sql = `UPDATE challenge5.autos SET nombre_vehiculos = '${nombre}', año_fabricacion = '${fecha_fabricacion}', precio ='${valor}', cantidad = '${cantidad}' WHERE idautos = ${id.idautos}`
    conexionBD.query(sql, err => {
        if(err) throw err
    })
    res.send('Actualización completa')
})


app.listen(3001, () => {
    console.log('servidor en el puerto 3001')
})
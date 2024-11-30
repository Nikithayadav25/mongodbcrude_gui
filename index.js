const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Brand=require('./models/brand');

const app=express();
const port=3000;

mongoose.connect('mongodb+srv://nikithaaaa25:nikitha25@cluster0.krduy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log('Connect to MongoDB'))
    .catch(err=>console.error('error connecting to MongoDB',err));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
app.set('view engine','ejs')
app.get('/',async(req,res)=>{
        try{
            const brands=await Brand.find();
            res.render('index',{brands});
        }catch(err){
            console.log(err);
            res.status(500).send('server error');
        }

    });
    app.post('/add',async(req,res)=>{
        try{
            const newBrand=new Brand({
                name:req.body.name,

                description:req.body.description
            });
            await newBrand.save();
            res.redirect('/');
        }catch(err){
            console.log(err);
            res.status(500).send('error adding brand');
        }    
    });

    app.get('/edit/:id',async(req,res)=>{
        try{
            const brand=await Brand.findById(req.params.id);
            if(brand)return res.status(404).send('brand not found');
        }
        catch(err){
            console.log(err);
            res.status(500).send('server error');

        }
    });
    app.post('/edit/:id',async(req,res)=>{
        try{
            await Brand.findByIdAndUpdate(req.params.id,req.body);
            res.redirect('/');
        } catch(err){
            console.log(err);
            res.status(500).send('error updating brand');
        }
    });
    app.post('/delete/:id',async(req,res)=>{
        try{
            await Brand.findByIdAndDelete(req.params.id);
            res.redirect('/');
        } catch(err){
            console.log(err);
            res.status(500).send('error deleting brand');
        }
    });


app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
});
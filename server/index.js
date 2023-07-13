var axios=require('axios')
const express=require("express")
const app=express()

const cors=require("cors")

const path = require('path');


const mongoose=require('mongoose')

const multer=require('multer')

const upload=multer({dest:'uploads/'})

app.use(express.urlencoded({ extended : true }));

app.use(express.json());

const User=require('./models/user.model')

const Stud=require('./models/student.model')

const Faculty=require('./models/faculty.model')


const District=require('./models/district.model')

const School=require('./models/school.model')


const video=require('./models/videos.models')

const Com=require('./models/comments.model')

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

mongoose.connect('mongodb://0.0.0.0:27017/')

app.post('/api/register',async(req,res)=>{
    console.log(req.body)
    try{
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        })
        res.json({status:'ok'})
    }catch(err){
        console.log(err)
    }
    
})

app.post('/api/login',async(req,res)=>{
   const user=await User.find({
    email:req.body.email,
    password:req.body.password
   }
   )
   if(user){
    return res.json({status:"ok",user})
   }
   else{
    return res.json(false)
   }
    
})

app.post('/api/distlogin',async(req,res)=>{
    const user=await District.find({
     email:req.body.email,
     password:req.body.password
    }
    )
    if(user){
     return res.json({status:"ok",user})
    }
    else{
     return res.json(false)
    }
     
 })

app.post('/api/studentlogin',async(req,res)=>{
    const user=await Stud.find({
     email:req.body.email,
     password:req.body.password
    }
    )
    if(user){
     return res.json({status:'ok',user})
    }
    else{
     return res.json({status:'error',user:false})
    }
})


app.post('/api/studentregister/:type/:id',async(req,res)=>{
    console.log(req.body)
    try{
        await Stud.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            study:req.body.study,
            school:req.body.school,
            aggr:req.body.aggr,
            gender:req.body.gender,
            dist:req.body.dist,
            schoolid:req.body.schoolid,
            distid:req.body.distid,
        })
        res.json({status:'ok'})
    }catch(err){
        console.log(err)
    }
    
})

app.post('/api/districtregister/:type/:id',async(req,res)=>{
    console.log(req.body)
    try{
        const response=await District.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            dist:req.body.dist,
            
        })
        res.json({status:'ok',response})
    }catch(err){
        res.json({status:'error',response:false})
    }
    
})

app.get('/api/alldistricts/:type/:id',async(req,res)=>{
    try{
        
        if(req.params.type=='distr'){
            const districts=await District.find({_id:req.params.id});
            console.log(districts)
            return res.status(200).json(districts);
        }
        if(req.params.type=='admin'){
            const districts=await District.find({});
            return res.status(200).json(districts);
        } 
         
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/allschools/:type/:id',async(req,res)=>{
    try{
        if(req.params.type=='distr'){
            const school=await School.find({distid:req.params.id});
            return res.status(200).json(school);
        }
        if(req.params.type=='admin'){
            const school=await School.find({});
            return res.status(200).json(school);
        }
        
    
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/allfaculty/:type/:id',async(req,res)=>{
    try{
        if(req.params.type=='distr'){
            const school=await Faculty.find({distid:req.params.id});
            return res.status(200).json(school);
        }
        if(req.params.type=='admin'){
            const school=await Faculty.find({});
            return res.status(200).json(school);
        }
        if(req.params.type=='school'){
            const school=await Faculty.find({schoolid:req.params.id});
            return res.status(200).json(school);
        }
   
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/allstud/:type/:id',async(req,res)=>{
    try{
        if(req.params.type=='distr'){
            const stud=await Stud.find({distid:req.params.id});
            return res.status(200).json(stud);
        }
        if(req.params.type=='admin'){
            const stud=await Stud.find({});
            return res.status(200).json(stud);
        }
        if(req.params.type=='school'){
            const stud=await Stud.find({schoolid:req.params.id});
            return res.status(200).json(stud);
        }
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.delete('/api/deletedist/:id',async(req,res)=>{ 
    try{
    await District.deleteOne({_id:req.params.id});
    res.status(201).json({status:'ok'});
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.delete('/api/deleteschl/:id',async(req,res)=>{ 
    try{
    await School.deleteOne({_id:req.params.id});
    res.status(201).json({status:'ok'});
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.delete('/api/deletefac/:id',async(req,res)=>{ 
    try{
    await Faculty.deleteOne({_id:req.params.id});
    res.status(201).json({status:'ok'});
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.delete('/api/deletestud/:id',async(req,res)=>{ 
    try{
    await Stud.deleteOne({_id:req.params.id});
    res.status(201).json({status:'ok'});
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/district/:type/:id',async(req,res)=>{
    try{
    const distrk=await District.find({_id:req.params.id});
    res.status(200).json(distrk);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/school/:type/:id',async(req,res)=>{
    try{
    const distrk=await School.find({_id:req.params.id});
    res.status(200).json(distrk);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/faculty/:type/:id',async(req,res)=>{
    try{
    const distrk=await Faculty.find({_id:req.params.id});
    res.status(200).json(distrk);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/student/:type/:id',async(req,res)=>{
    try{
    const distrk=await Stud.find({_id:req.params.id});
    res.status(200).json(distrk);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.put('/api/editdist/:type/:id',async(req,res)=>{
    
    try{
    await District.updateOne({_id:req.params.id},req.body);
    res.status(201).json({status:'ok'});
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.put('/api/editschl/:type/:id',async(req,res)=>{
    
    try{
    await School.updateOne({_id:req.params.id},req.body);
    res.status(201).json({status:'ok'});
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.put('/api/editfac/:type/:id',async(req,res)=>{
    
    try{
    await Faculty.updateOne({_id:req.params.id},req.body);
    res.status(201).json({status:'ok'});
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.put('/api/editstud/:type/:id',async(req,res)=>{
    
    try{
    await Stud.updateOne({_id:req.params.id},req.body);
    res.status(201).json({status:'ok'});
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/student/:type/:id',async(req,res)=>{
    try{
    const distrk=await Stud.find({_id:req.params.id});
    res.status(200).json(distrk);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/scholarship/:id', async (req, res) => {
    try {
      const student = await Stud.findById(req.params.id);
      res.json({ aggr: student.aggr });
      console.log()
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

app.post('/api/studentlogin',async(req,res)=>{
    const user=await District.findOne({
     email:req.body.email,
     password:req.body.password
    }
    )
    if(user){
     const token=jwt.sign({
         name:user.name,
         email:user.email
     },'secret13')
     return res.json({status:'ok',user:true})
    }
    else{
     return res.json({status:'error',user:false})
    }
})


app.post('/api/schoolregister/:type/:id',async(req,res)=>{
    console.log(req.body)
    try{
        const response=await School.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            distr:req.body.distr,
            distid:req.body.distid,
        })
        //res.json(res.distid)
        res.json({status:'ok'})
        
    }catch(err){
        console.log(err)
    }
    
})



app.post('/api/facultyregister/:type/:id',async(req,res)=>{
    console.log(req.body)
    try{
        await Faculty.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            subject:req.body.subject,
            school:req.body.school,
            dist:req.body.dist,
            distid:req.body.distid,
            schoolid:req.body.schoolid
        })
        res.json({status:'ok'})
    }catch(err){
        console.log(err)
    }
    
})

app.post('/api/facultyloginforcourse',async(req,res)=>{
    const user=await Faculty.find({
     email:req.body.email,
     password:req.body.password
    }
    )
    if(user){
     return res.json({status:'ok',user})
    }
    else{
     return res.json({status:'error',user:false})
    }
})

app.post('/api/schoollogin',async(req,res)=>{
    const user=await School.find({
     email:req.body.email,
     password:req.body.password
    }
    )
    if(user){
     return res.json({status:'ok',user})
    }
    else{
     return res.json({status:'error',user:false})
    }
})

app.post('/api/addcourse/:type/:id',async(req,res)=>{
    console.log(req.body)
    try{
        await Course.create({
            title:req.body.title,
            author:req.body.author
            
        })
        res.json({status:'ok'})
    }catch(err){
        console.log(err)
    }
    
})

const cpUpload=upload.fields([{name:'imageUrl',maxCount: 1 }, { name: 'videoUrl', maxCount: 1 }]);
app.post('/api/video/:type/:id',cpUpload,async(req,res)=>{
   
    try{
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const year = now.getFullYear().toString();
            const formattedDate = `${year}-${month}-${day}`;
        await video.create({
                title:req.body.title,
                description:req.body.description,
                imageUrl:req.files['imageUrl'][0].path,
                videoUrl:req.files['videoUrl'][0].path,
                facname:req.body.name,
                date:formattedDate,
            })
         
        res.json({status:'ok'})
    }catch(err){
        console.log(err)
    }
    
})

app.get('/api/uploadedVideos/:type/:id',async(req,res)=>{
    try{
    const vi=await video.find({});
    res.status(200).json(vi);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})


app.get('/api/getvideo/:type/:id',async(req,res)=>{
    try{
    const vid=await video.find({_id:req.params.id});
    res.status(200).json(vid);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})
app.listen(1337,()=>{
    console.log("server started on 1337")
})

app.get('/api/count/gender/:type/:id', async (req, res) => {
    const students = await Stud.find();
    const maleCount = students.filter(student => student.gender === 'Male').length;
    const femaleCount = students.filter(student => student.gender === 'Female').length;
    res.json({
      maleCount,
      femaleCount
    });
  });
  
  app.get('/api/districts/schools/', async (req, res) => {
    try {
      const schools = await School.aggregate([
        { $group: { _id: '$distr', count: { $sum: 1 } } },
      ]);
      res.json(schools);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


  app.get('/api/students-by-district', async (req, res) => {
    try {
      const students = await Stud.aggregate([
        { $group: { _id: '$dist', count: { $sum: 1 } } },
      ]);
      res.json(students);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
 
  app.get('/api/faculty-by-district', async (req, res) => {
    try {
      const schools = await Faculty.aggregate([
        { $group: { _id: '$dist', count: { $sum: 1 } } },
      ]);
      res.json(schools);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  app.get('/api/faculty-by-school', async (req, res) => {
    try {
      const faculty = await Faculty.aggregate([
        { $group: { _id: '$school', count: { $sum: 1 } } },
      ]);
      res.json(faculty);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  app.get('/api/student-by-school', async (req, res) => {
    try {
      const faculty = await Stud.aggregate([
        { $group: { _id: '$school', count: { $sum: 1 } } },
      ]);
      res.json(faculty);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  app.get('/api/totalscholarship', async (req, res) => {
    try {
      // Find all students with an aggregate score greater than 80
      const studentsAbove80 = await Stud.countDocuments({ aggr: { $gt: 80 } }).exec();
      const studentsBelow80 = await Stud.countDocuments({ aggr: { $lte: 80 } }).exec();
      res.json({studentsAbove80, studentsBelow80});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/scholarship-by-district', async (req, res) => {
    try {
      const schools = await Stud.aggregate([
        { $match: { aggr: { $gt: 80 } } },
        { $group: { _id: '$dist', count: { $sum: 1 } } },
      ]);
      res.json(schools);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  app.get('/api/scholarship-by-school', async (req, res) => {
    try {
      const schools = await Stud.aggregate([
        { $match: { aggr: { $gt: 80 } } },
        { $group: { _id: '$school', count: { $sum: 1 } } },
      ]);
      res.json(schools);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  app.get('/api/noscholarship-by-district', async (req, res) => {
    try {
      const schools = await Stud.aggregate([
        { $match: { aggr: { $lt: 80 } } },
        { $group: { _id: '$dist', count: { $sum: 1 } } },
      ]);
      res.json(schools);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  app.get('/api/noscholarship-by-school', async (req, res) => {
    try {
      const schools = await Stud.aggregate([
        { $match: { aggr: { $lt: 80 } } },
        { $group: { _id: '$school', count: { $sum: 1 } } },
      ]);
      res.json(schools);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

   /*async function get()
 {
     let res=await Stud.find({});
     res.forEach((s)=>{
         axios.put('https://api.chatengine.io/users/',{username:s.name,secret:s.name,custom_json:"{type:stud}"},{headers:{"Private-Key":"22d78935-e382-4c60-8996-cb0e4c2e9c1f"}}).then(function (response) {
             console.log(JSON.stringify(response.data));
         })
         .catch(function (error) {
             console.log(error.response.data);
         });
     });
 }
 get();

 async function get()
 {
     let res=await Faculty.find({});
     res.forEach((s)=>{
         axios.put('https://api.chatengine.io/users/',{username:s.name,secret:s.name,custom_json:"{type:fac}"},{headers:{"Private-Key":"22d78935-e382-4c60-8996-cb0e4c2e9c1f"}}).then(function (response) {
             console.log(JSON.stringify(response.data));
         })
         .catch(function (error) {
             console.log(error.response.data);
         });
     });
 }
 get();*/

app.post('/api/addcomment/:type/:id/:videoid',async(req,res)=>{
   
    try{
        await Com.create({
            text:req.body.text,
            name:req.body.name,
            videoid:req.params.videoid,
            timestamp: Date.now(),
            
        })
        res.json({status:'ok'})
    }catch(err){
        console.log(err)
    }
    
})

app.get('/api/getcomments/:type/:id/:videoid',async(req,res)=>{
    console.log(req.body)
    try{
      const comments=  await Com.find({videoid:req.params.videoid });
        res.json(comments);
    }catch(err){
        console.log(err)
    }
    
})

app.get('/api/admin/:type/:id',async(req,res)=>{
    try{
    const distrk=await User.find({_id:req.params.id});
    res.status(200).json(distrk);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})

app.get('/api/byDateVideos/:date',async(req,res)=>{
    try{
   console.log("entring bydate api");
   console.log(req.params.date);
    const vid=await video.find({date:req.params.date});
    console.log(vid);
    res.status(200).json(vid);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
})
const MongoClient = require('mongodb').MongoClient;

//Connection URL
const url = 'mongodb://localhost:27017/';
const dbName = 'myproject';

MongoClient.connect( url, function(err, client){
  if(err){
    return console.dir(err);
  }

  console.log('Connected to mongodb');
  const db = client.db(dbName);
/*
  InsertDocument(db, function(){
    db.close();
  });
  InsertDocuments(db, function(){
    client.close();
  });
  FindDocuments(db, function(){
    client.close();
  });
  QueryDocuments(db, function(){
    client.close();
  });

  UpdateDocument(db, function(){
    client.close();
  });

  */

  DeleteDocument(db, function(){
    client.close();
  });

});

//Insert single doc
const InsertDocument = function(db, callback){

  // Get Collection
  const collection = db.collection('users');
  collection.insertOne({
    name: 'Brett',
    email: 'Test@localhost.com'
  })
  .then(function(result) {
    //console.log(result);
    callback(result);
  });
};

// Insert Many
const InsertDocuments = function(db, callback){
  const collection = db.collection('users');

  collection.insertMany([
    { Name: 'Brett', email: 'test@gmail.com' },
    { Name: 'Francisco', email: 'Lindor@tribe.com'},
    { Name: 'Jose', email: 'Goat@tribe.com' }
  ], function(err, result){

    if(err){
      return console.dir(err);
    }

    console.log("inserted " + result.ops.length + " documents");
    callback(result);
  });
};


// Find a document
const FindDocuments = function(db, callback){
  const collection = db.collection('users');

  // empty braces means find everything
  collection.find({
  }).toArray( function(err, docs){
    if( err ) return console.dir(err);

    console.log("found the following records");
    console.log(docs);
    callback(docs);
  });

}

const QueryDocuments = function( db, callback ){
  const collection = db.collection('users');

  collection.find({
    'Name': 'Brett'
  }).toArray( function(err, docs){
    if( err ) return console.dir(err);

    console.log("found the following records");
    console.log(docs);
    callback(docs);
  });
}

const UpdateDocument = function(db, callback){
  const collection = db.collection('users');

  collection.updateOne({ Name: 'Brett' },
    { $set: {email: 'Updated@gmail.com'}}, function(err, result){
      if( err ) return console.dir(err);

      console.log("Record has been updated");
      callback(result);
    });
}

// Delete a single document
const DeleteDocument = function(db, callback){
  const collection = db.collection('users');
  
  collection.deleteOne({
    Name: 'Brett',
    email: 'Test@localhost.com'
  }, function(err, result){
    if(err) return console.dir(err);

    console.log("Entry deleted");
    callback(result);
  });
};

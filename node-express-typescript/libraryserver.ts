import express, { Express, Request, Response} from 'express';
import logger, {} from "morgan";
import QueryString from "querystring";
import { MongoClient, WithId, Document, ObjectId} from 'mongodb'
import rateLimit from 'express-rate-limit';
import session from 'express-session';  
import csurf from 'csurf';
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import passport from 'passport'
import cors from 'cors'

// import GoogleStrategy  from 'passport-google'

var ksiazkiarray: any[][] = []
var logeduser = {imie: '', nazwisko: '', ksiazki: ksiazkiarray, ilosc: 0}

const options: cors.CorsOptions = {
    origin: ['http://localhost:3001', 
    'http://localhost:3001/login/google', 'http://localhost:3001/oauth2/redirect/google',
    'https://*'
]
  };

const app = express();
app.use(cookieParser());

app.use(session({
    secret: "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",
    resave: false,
    saveUninitialized: true,
}));

app.use(cors())

app.use(passport.session()); 
// app.use(helmet({crossOriginEmbedderPolicy: false}));

app.use(helmet.contentSecurityPolicy({
    directives: {
      styleSrc: ["'self'", "'unsafe-inline'",
    "https://www.w3schools.com/w3css/4/w3.css", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'",  "https://*"], //"https://encrypted-tbn0.gstatic.com/images\?q=tbn:ANd9GcTuIBW0JL1-GaVattVZJRJv3YFyJP3o-Ry4bg&usqp=CAU"],
     connectSrc: ["'self'", "https://accounts.google.com/o/oauth2/*"], // "https://accounts.google.com/o/oauth2/v2/*"],
     scriptSrcAttr: ["'self'", "'unsafe-inline'"],
     defaultSrc: ["'self'"]
    },
  }));

    app.set('views', __dirname + '/views');
    app.set('view engine', 'pug');
    app.locals.pretty = app.get('env') === 'development';
    var logged: number = -1;
    

enum Errors {
    error1 = "There was passed string array as string",
    error2 = "There was passed undefined",
    error3 = "Udenfine in Mongodb",
    error4 = "Mongodb users returned undefined",
    error5 = "Mongodb books returned undefined",
    error6 = "Musisz być zalogowany, aby móc wyporzyczać",
    error7 = "Wszytskie egzemplarze tej ksiazki zostały wyporzyczone",
    error8 = "Już wyporzyczyłeś jeden egzemplarz tej książki",

}

passport.use(new GoogleStrategy({
    clientID: "509014859330-a286q15v99dvbuntrt5cpdmlqd1dl1fv.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: ['profile']
  },
  function verify(accessToken, refreshToken, profile, cb) {

    // console.log('a nawet coś się dzieje')
    // console.log(profile.displayName)
    // console.log(profile.id)

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";
    MongoClient.connect(url, function(err, db: MongoClient | undefined): void {

    if (err) throw err;
    if (db === undefined) {
        console.log(Errors.error3);
        return;
    }

    var dbo = db.db("library");

    dbo.collection("users").find({id: profile.id}).toArray(function(err, users: WithId<Document>[] | undefined): void{
            
            if (err) throw err;
           

            if (users === undefined || users[0] == undefined) {
                
                dbo.collection("users").insertOne({imie: profile.displayName, nazwisko: "", ksiazki: [], id: profile.id})
                
                var arr: any[] = []

                var user = {
                    "imie": profile.displayName, nazwisko: "", "ksiazki": arr, "nr": 1
                }

                return cb(null, user);
            }

            else {

                var imie: string = users[0].imie.toString()

                if (Array.isArray(users[0].ksiazki)) {

                    var user = {
                        "imie": imie, nazwisko: "", "ksiazki": users[0].ksiazki, "nr": 1
                    }
            
                    return cb(null, user);
                }

                console.log("BŁĄÐ W BAZIE DANYCH BŁĄD W BAZIE DANYCH")

                    return 

            }
    
        })

    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user: any, done) {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res: any) {

        res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
        if (Array.isArray(res.req.user.ksiazki)) {
            var a: string[] = res.req.user.ksiazki
            czytelnicy[0] = res.req.user.imie
            czytelnicy[1] = ''
            logeduser.imie = res.req.user.imie
            logeduser.nazwisko = ''
            for (let i in a) {
                logeduser.ksiazki[i] = res.req.user.ksiazki[i]
            }
            logeduser.ilosc = a.length
            logged = 1;
            // res.render('library', {bib: dan, user: res.req.user})   // imie: res.req.user.imie, ksiazki: a.toString(), ilosc: a.length});
            res.redirect('/');
        }
        // res.redirect('/');

});

app.get('/logout', function(req, res, next) {
    console.log('a')
    req.logout(function(err) {
      if (err) { return next(err); }
      logeduser.imie = ''
      logeduser.ksiazki = []
      logeduser.ilosc = 0
      logged = -1
      res.redirect('/');
    });
  });
  



var czytelnicy: any[] = []

app.get('/', function (req: Request, res: Response) {

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db: MongoClient | undefined): void {

    if (err) throw err;
    if (db === undefined) {
        console.log(Errors.error3);
        return;
    }

    var dbo = db.db("library");

    dbo.collection("books").find({}).toArray(function(err, book: WithId<Document>[] | undefined): void{

        if (book === undefined) {
            console.log('Book undefined')
            return
        }
        
        var dan: string = JSON.stringify(book); 
        var use: string = JSON.stringify(logeduser)
        res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
        res.render('library.pug', {bib: dan, user: use, imie: logeduser.imie});

    });

});
});

// app.put('/', function (req: Request, res: Response): void {
//     console.log("logowanie");

//     if (Array.isArray(req.query.login))
//     {
//         console.log(Errors.error1)
//         return;
//     }
//     if (req.query.login === undefined)
//     {
//         console.log(Errors.error2)
//         return;
//     }

//     if (Array.isArray(req.query.haslo))
//     {
//         console.log(Errors.error1)
//         return;
//     }
//     if (req.query.haslo === undefined)
//     {
//         console.log(Errors.error2)
//         return;
//     }


//     var name = req.query.login.toString();
//     var pew = req.query.haslo.toString();

//     var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

//     MongoClient.connect(url, function(err, db: MongoClient | undefined): void {

//     if (err) throw err;
//     if (db === undefined) {
//         console.log(Errors.error3);
//         return;

//     }
//     var dbo = db.db("library");


//         dbo.collection("users").find({login: name, haslo: pew}).toArray(function(err, users: WithId<Document>[] | undefined): void{
            
//             if (users === undefined) {
//                 console.log(Errors.error4);
//                 return;
//             }
           
//             if (users[0] === undefined) {
//                 console.log("Your password or login is not correct")
//                 res.type('application/json')
//                 res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
//                 res.json({"imie": 0, "nazwisko": 0, "ksiazki": 0, "nr": -1})
//                 return

//             }
    
//             czytelnicy[0] = users[0].imie
//             czytelnicy[1] = users[0].nazwisko

//             logged = 1;
//             console.log('logged in login; ' + logged);

//             res.type('application/json');
//             res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
//             res.json({"imie": users[0].imie, "nazwisko": users[0].nazwisko, "ksiazki": users[0].ksiazki});
        
//     })

// });



// })

app.post('/', function (req: Request, res: Response) {

    var body: string = '';   

    req.on('data', function (data: string): void {
        body += data;
        var post: QueryString.ParsedUrlQuery = QueryString.parse(body);
        console.log(post.imie + ' ' + post.nazwisko);

        // Send the text plain greeting
        var url: string = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db: MongoClient | undefined): void {
        if (err) throw err;
        if (db === undefined) {
            console.log(Errors.error3);
            return;
        }
        var dbo = db.db("library");
        
        if (post.tytul === undefined || post.autorzy === undefined) {
            return
        }   

        var title: string  = post.tytul.toString()
        var autors: string = post.autorzy.toString()

        dbo.collection("books").find({tytul: title, autorzy:autors}).toArray(function(err, dane: WithId<Document>[] | undefined): void {
          if (err) throw err;

        if (Array.isArray(post.index)) {
            console.log(Errors.error1)
            return
        }
        if (post.index === undefined) {
            console.log(Errors.error2)
            return
        }
        if (dane === undefined) {
            console.log(Errors.error3)
            return
        }
        // if (dane[0] === undefined) {
        //     console.log('Wrong book title')
        //     res.type('application/json')
        //     res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
        //     res.json({"nr": -3})
        //     return;

        // } 

	    let j: number = parseInt(post.index);
        console.log('logged in post' + logged);

        if (logged === -1) {
            console.log(Errors.error6);
            res.type('application/json')
            res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
            res.json({"nr": -1})
            return
        }
        if (dane[0].ilosc === 0) {
            console.log(Errors.error7);
            res.type('application/json')
            res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
            res.json({"nr": -2})
            return
        }

        if (post.imie === undefined || post.nazwisko === undefined) {
            console.log('post undeined imie or nazwisko')
            return
        }
        
        var name: string = post.imie.toString()
        var surname: string = post.nazwisko.toString()

    dbo.collection("users").find({imie: name, nazwisko: surname}).toArray(function(err, czyt: WithId<Document>[] | undefined): void{
        if (czyt === undefined) {
            console.log(Errors.error3)
            return
        }
        // console.log(czyt)
        // if (czyt[0] === undefined) {
        //     console.log("Wrong data");
        //     res.type('application/json')
        //     res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
        //     res.json({"nr": -3})
        //     return;

        // } 

        console.log(post.imie + czytelnicy[0] + post.nazwisko + czytelnicy[1])

        if (post.imie !== czytelnicy[0] || post.nazwisko !== czytelnicy[1]) {
            console.log("Wrong data when compare to login");
            res.type('application/json')
            res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
            res.json({"nr": -3})
            return;
        }

        for (let i: number = 0; i < czyt[0].ksiazki.length; i++) {
            if (dane[0].tytul === czyt[0].ksiazki[i][0])
            {
                console.log(Errors.error8);
                res.type('application/json')
                res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
                res.json({"nr": -3})
                return;
            }
        }

        console.log('Wyporzyczono') 

        if (post.tytul === undefined || post.autorzy === undefined || post.link === undefined || post.index === undefined) {
            return
        }

        var qq = czyt[0]._id
        var title: string = post.tytul.toString()
        var autors: string = post.autorzy.toString()
        var lin: string = post.link.toString()
        var inde: string = post.index.toString()

        logeduser.ksiazki[logeduser.ilosc] = [title, autors, lin, parseInt(inde)]
        logeduser.ilosc = logeduser.ilosc + 1

        // deepcode ignore NoSqli: <please specify a reason of ignoring this>, deepcode ignore NoSqli: <please specify a reason of ignoring this>
        dbo.collection("users").updateOne({_id: qq},{ $push: {"ksiazki": [title, autors, lin, inde]}})

        let a: number = parseInt(dane[0].ilosc);
        a = a - 1;
        var q = dane[0]._id;

        dbo.collection("books").updateOne({_id: q},{ $set: {"ilosc": a}})

        res.type('application/json')
        res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
        res.json({"nr": 1})
        return;

    })
        });
      });

    })
    
})

app.delete('/', function(req: Request, res: Response) {

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db: MongoClient | undefined): void {

    if (err) throw err;

    if (db == undefined) {
        console.log(Errors.error3);
        return;
    }
    var dbo = db.db("library");

    if (req.query.imie === undefined || req.query.nazwisko === undefined) {
        return
    }

    if (Array.isArray(req.query.imie) || Array.isArray(req.query.nazwisko)) {
        return
    }


    var name: string = req.query.imie.toString()
    var surname: string = req.query.nazwisko.toString()

        
    dbo.collection("users").find({imie: name, nazwisko: surname}).toArray(function(err, czyt: WithId<Document>[] | undefined): void{
        if (czyt === undefined) {
            console.log(Errors.error4);
            return
        }
        if (czyt[0] === undefined) {
            console.log("Wrong data");
            res.type('application/json')
            res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
            res.json({"nr": -1})
            return
        }

        if (req.query.imie !== czytelnicy[0] || req.query.nazwisko !== czytelnicy[1]) {
            console.log("It's not you");
            res.type('application/json')
            res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
            res.json({"nr": -1})
            return
        }
        let flag: number = 0;

        for (let j: number =0; j < czyt[0].ksiazki.length; j ++) {
            if (czyt[0].ksiazki[j][0] == req.query.tytul) {
                flag = 1;

                if (req.query.tytul === undefined || req.query.autorzy === undefined || req.query.link === undefined || req.query.index === undefined) {
                    return
                }

                var qq = czyt[0]._id
                if (Array.isArray(req.query.tytul) || Array.isArray(req.query.autorzy) || Array.isArray(req.query.link) || Array.isArray(req.query.index)) {
                    return
                }
                var title: string = req.query.tytul.toString()
                var autors: string = req.query.autorzy.toString()
                var link: string = req.query.link.toString()
                var index: string = req.query.index.toString()

                // deepcode ignore NoSqli: <please specify a reason of ignoring this>, deepcode ignore NoSqli: <please specify a reason of ignoring this>
                dbo.collection("users").updateOne({_id: qq},{ $pull: {"ksiazki": [title, autors, link, index]}})

                dbo.collection("books").find({tytul: title, autorzy: autors}).toArray(function(err, dane) {
                    if (dane == undefined) {
                        console.log(Errors.error5)
                        return
                    }

                var q = dane[0]._id
                let a: number = parseInt(dane[0].ilosc);
                a = a + 1;
                console.log('Zwrócone')

                var filtered = logeduser.ksiazki.filter(function(value, index, arr){ 
                    return value[0] != dane[0].tytul;
                });
                logeduser.ksiazki = filtered;
                logeduser.ilosc = logeduser.ilosc - 1
                
                dbo.collection("books").updateOne({_id: q},{ $set: {"ilosc": a}})
                res.type('application/json')
                res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
                res.json({"nr": 1})
                return

            });
        }
        }
        if (flag == 0) {
            console.log('Something went wrong')
            res.type('application/json')
            res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
            res.json({"nr": -1})
        }

    })

    });

})

app.get('/catbooks.gif', function(req: Request, res: Response) {
    res.cookie('3pcookie', 'value', {sameSite: 'strict', secure: true, httpOnly: true})
    res.sendFile('/home/reny/AGH/programowanie_skryptowe_js/Lab_9/catbooks.gif');
})

app.use(morgan('dev'));


app.use(csurf({ cookie: true }));

app.listen(3000, function (): void {
    console.log('The application is available on port 3000');
});
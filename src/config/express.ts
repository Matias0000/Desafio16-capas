import express, { Application, NextFunction, Request, Response } from 'express';
import router  from '../routes';
import MongoStore from 'connect-mongo';
import session from 'express-session'
import { engine as handlebars } from 'express-handlebars'
import { sessionToLocals } from '../middlewares';
import passport from 'passport';
import compression from 'compression';
import { loggerInfo, loggerWarning } from '../utils';

export const createApp = (): Application => {
   const app = express();

   app.use(compression())

   app.use(express.static('public'));
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
app.use(
   session({
      secret: '1234567890!@#$%^&*()',
      saveUninitialized: false,
      resave: false,
      cookie: {
         maxAge: 60000 * 10,
      },
      store: MongoStore.create({
         mongoUrl:
         process.env.MONGO_URI || 'mongodb+srv://Matias:coderhouse@cluster0.asa9o.mongodb.net/ecommerce',
            // mongoUrl:
            // process.env.MONGO_URI,
         dbName: 'ecommerce',
         collectionName: 'sessions',
      }),
   })
);

   app.use(passport.authenticate('session'))

   app.use(sessionToLocals)

   app.engine('hbs', handlebars({
      layoutsDir: __dirname + '/../../views/layouts',
      partialsDir: __dirname + '/../../views/partials',
      defaultLayout: 'index',
      extname: 'hbs',
      runtimeOptions: {
         allowProtoPropertiesByDefault: true,
      }
   }))

   app.set('view engine', 'hbs');
   app.set('views', __dirname + '/../../views');

   app.use((req: Request, res: Response, next: NextFunction) => {
      loggerInfo.info(`${req.method} ${req.url}`);
      next()
   })

   app.use(router);



   app.all('*',(req: Request,res: Response) => {
      loggerWarning.warn(`${req.method } ${req.url} redirigir a otra pagina`);
      res.status(404).send('404 Not Found')
   })

   app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      res.status(500).json({ err, message: 'error' });
   });

   return app;
};

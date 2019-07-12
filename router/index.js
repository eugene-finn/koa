const Router = require('koa-router');
const router = new Router();

const productsCtrl = require('../controllers/products.js');
const skillsCtrl = require('../controllers/skills.js');
const authCtrl = require('../controllers/auth.js');
const messageCtrl = require('../controllers/messages.js');

router.get('/', async (ctx) => {
  const products = await productsCtrl.get();
  const skills = await skillsCtrl.get();
  const msgsemail = await ctx.flash && ctx.flash.get() ? ctx.flash.get().msgsemail : null;;
  try {
    ctx.render('index', {
      products,
      skills,
      msgsemail

    });

  } catch (err) {
    console.error('err', err)
    if (err.status) {
      ctx.status = err.status;
    } else ctx.status = 404;
  }
});

router.post('/', async (ctx) => {

  try {
    await messageCtrl.set({
      ...ctx.request.body
    })

    ctx.flash.set({
      msgsemail: "Сообщение отправлено"
    });

    ctx.redirect('/');
  } catch (err) {
    console.error('err', err)
    ctx.flash.set({
      msgsemail: "Ошибка, попробуйте отправить снова"
    });
    if (err.status) {
      ctx.status = err.status;
    } else ctx.status = 404;
  }
});


router.get('/admin', async (ctx) => {
  try {
    const msgskill = ctx.flash && ctx.flash.get() ? ctx.flash.get().msgskill : null;
    const msgfile = ctx.flash && ctx.flash.get() ? ctx.flash.get().msgfile : null;

    ctx.render('admin', {
      msgskill,
      msgfile
    });

  } catch (err) {
    console.error('err', err)
    ctx.status = 404;
  }
});

router.post('/admin/skills', async (ctx) => {
  // console.log('ctx post skills', ctx);
  try {
    await skillsCtrl.set({
      ...ctx.request.body
    })

    ctx.flash.set({
      msgskill: "все хорошо"
    });
    ctx.redirect('/admin');
  } catch (err) {
    ctx.flash.set({
      msgskill: err
    });

    // console.error('err', err)
    // ctx.status = 404;
    ctx.redirect('/admin');
  }
});

router.post('/admin/upload', async (ctx) => {
  try {
    await productsCtrl.add({
      ...ctx.request.files,
      ...ctx.request.body
    })
    console.error('после 6 строки', err)
    ctx.flash.set({
      msgfile: "Товар добавлен"
    });
    ctx.redirect('/admin');
  } catch (err) {
    console.error('err koko', err)
    ctx.flash.set({
      msgfile: "Где-то ошибка"
    });
    ctx.redirect('/admin');

  }
});

router.get('/login', async (ctx) => {
  try {
    const msgslogin = ctx.flash && ctx.flash.get() ? ctx.flash.get().msgslogin : null;

    ctx.render('login', {
      msgslogin
    });
  } catch (err) {
    console.error('err', err)
    ctx.status = 404;
  }
});

router.post('/login', async (ctx) => {
  try {
    const authResult = await authCtrl.auth(ctx.request.body);
    ctx.session.isAuth = true;

    ctx.redirect('admin');
  } catch (err) {
    console.error('err', err);
    ctx.flash.set({
      msgslogin: err
    });
    ctx.redirect('/login');
  }

});

module.exports = router;
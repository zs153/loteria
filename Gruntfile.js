'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: {
      src: ['dist']
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'src/public/css/styles.css': ['src/public/css/estilos.css', 'src/public/css/navbar.css', 'src/public/css/tabs.css']
        }
      }
    },    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        files: {
          // bin
          'dist/bin/www.js': ['./dist/bin/www.js'],
          // config
          'dist/config/settings.js': ['./dist/config/settings.js'],
          // controllers
          // admin
          'dist/controllers/admin/carga.controller.js':     ['./dist/controllers/admin/carga.controller.js'],
          'dist/controllers/admin/estadistica.controller.js':   ['./dist/controllers/admin/estadistica.controller.js'],
          'dist/controllers/admin/formulario.controller.js': ['./dist/controllers/admin/formulario.controller.js'],
          'dist/controllers/admin/historico.controller.js':   ['./dist/controllers/admin/historico.controller.js'],
          'dist/controllers/admin/oficina.controller.js':  ['./dist/controllers/admin/oficina.controller.js'],
          'dist/controllers/admin/tipos.controller.js':  ['./dist/controllers/admin/tipos.controller.js'],
          'dist/controllers/admin/usuario.controller.js':   ['./dist/controllers/admin/usuario.controller.js'],
          // user
          'dist/controllers/user/formulario.controller.js':['./dist/controllers/user/formulario.controller.js'],
          'dist/controllers/user/usuario.controller.js':    ['./dist/controllers/user/usuario.controller.js'],
          // main
          'dist/controllers/main.controller.js': ['./dist/controllers/main.controller.js'],
          // middleware
          'dist/middleware/auth.js': ['./dist/middleware/auth.js'],
          // public-js
          // admin
          'dist/public/js/admin/addCarga.min.js': ['./dist/public/js/admin/addCarga.min.js'],
          'dist/public/js/admin/addEditFormulario.min.js': ['./dist/public/js/admin/addEditFormulario.min.js'],
          'dist/public/js/admin/addEditOficina.min.js': ['./dist/public/js/admin/addEditOficina.min.js'],
          'dist/public/js/admin/addEditReferencia.min.js': ['./dist/public/js/admin/addEditReferencia.min.js'],
          'dist/public/js/admin/addEditSms.min.js': ['./dist/public/js/admin/addEditSms.min.js'],
          'dist/public/js/admin/addEditTipo.min.js': ['./dist/public/js/admin/addEditTipo.min.js'],
          'dist/public/js/admin/addEditUsuario.min.js': ['./dist/public/js/admin/addEditUsuario.min.js'],
          'dist/public/js/admin/asignar.min.js': ['./dist/public/js/admin/asignar.min.js'],
          'dist/public/js/admin/desasignar.min.js': ['./dist/public/js/admin/desasignar.min.js'],
          'dist/public/js/admin/editHistorico.min.js': ['./dist/public/js/admin/editHistorico.min.js'],
          'dist/public/js/admin/indexAdes.min.js': ['./dist/public/js/admin/indexAdes.min.js'],
          'dist/public/js/admin/indexCargas.min.js': ['./dist/public/js/admin/indexCargas.min.js'],
          'dist/public/js/admin/indexFormularios.min.js': ['./dist/public/js/admin/indexFormularios.min.js'],
          'dist/public/js/admin/indexHistoricos.min.js': ['./dist/public/js/admin/indexHistoricos.min.js'],
          'dist/public/js/admin/indexOficinas.min.js': ['./dist/public/js/admin/indexOficinas.min.js'],
          'dist/public/js/admin/indexReferencias.min.js': ['./dist/public/js/admin/indexReferencias.min.js'],
          'dist/public/js/admin/indexResueltos.min.js': ['./dist/public/js/admin/indexResueltos.min.js'],
          'dist/public/js/admin/indexSmss.min.js': ['./dist/public/js/admin/indexSmss.min.js'],
          'dist/public/js/admin/indexStats.min.js': ['./dist/public/js/admin/indexStats.min.js'],
          'dist/public/js/admin/indexTipos.min.js': ['./dist/public/js/admin/indexTipos.min.js'],
          'dist/public/js/admin/indexUsuarios.min.js': ['./dist/public/js/admin/indexUsuarios.min.js'],
          // user
          'dist/public/js/user/addEditFormulario.min.js': ['./dist/public/js/user/addEditFormulario.min.js'],
          'dist/public/js/user/addEditReferencia.min.js': ['./dist/public/js/user/addEditReferencia.min.js'],
          'dist/public/js/user/addEditSms.min.js': ['./dist/public/js/user/addEditSms.min.js'],
          'dist/public/js/user/indexFormularios.min.js': ['./dist/public/js/user/indexFormularios.min.js'],
          'dist/public/js/user/indexReferencias.min.js': ['./dist/public/js/user/indexReferencias.min.js'],
          'dist/public/js/user/indexResueltos.min.js': ['./dist/public/js/user/indexResueltos.min.js'],
          'dist/public/js/user/indexSmss.min.js': ['./dist/public/js/user/indexSmss.min.js'],
          'dist/public/js/user/perfil.min.js': ['./dist/public/js/user/perfil.min.js'],
          // 
          'dist/public/js/ayuda.min.js': ['./dist/public/js/ayuda.min.js'],
          'dist/public/js/enumeraciones.js': ['./dist/public/js/enumeraciones.js'],
          // routes
          'dist/routes/admin.router.js': ['./dist/routes/admin.router.js'],
          'dist/routes/main.router.js': ['./dist/routes/main.router.js'],
          'dist/routes/user.router.js':['./dist/routes/user.router.js'],
          // app
          'dist/app.js': ['./dist/app.js'],
        }
        // src: ['./src/views/admin/formularios/ades/desasignar.js'],
        // dest: './src/public/js/admin/desasignar.min.js'
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('concat-js', ['concat:js']);
  grunt.registerTask('default-js', ['uglify:js']);
  grunt.registerTask('default-css', ['uglify:css']);
  grunt.registerTask('concat-css', ['concat:css']);
  grunt.registerTask('css-min', ['cssmin']);

};
var app = angular.module("app", ['angular.css.injector', 'ngDragDrop', 'ngAnimate', 'ngCookies', 'ngRoute', 'ngResource', 'ngSanitize', 'pascalprecht.translate', 'tmh.dynamicLocale']);

//Config Area
app.constant('LOCALES', {
    'locales': {
        'es_ES': 'Spanish',
        'en_US': 'English'
    },
    'preferredLocale': 'es_ES'
});


app.config(function ($translateProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
});

app.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: "resources/locale-",// path to translations files
        suffix: ".json" // suffix, currently- extension of the translations
    });
    $translateProvider.preferredLanguage('en_ES');// is applied on first load
    $translateProvider.useLocalStorage();// saves selected language to localStorage
});

app.config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('angular-i18n/angular-locale_{{locale}}.min.js');
})




app.controller('MainCtrl', function ($scope, cssInjector, LocaleService) {
    
    $scope.init = function ()
    {

        $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
        $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
        $scope.visible = $scope.localesDisplayNames &&
        $scope.localesDisplayNames.length > 1;

        $scope.selectedTheme = "default";

        $scope.themes = [
            { name: "Default", theme: "Default", path: "https://bootswatch.com/spacelab/bootstrap.min.css" },
            { name: "Light", theme: "Light", path: "https://bootswatch.com/cosmo/bootstrap.min.css" },
            { name: "Dark", theme: "Dark", path: "https://bootswatch.com/cyborg/bootstrap.min.css" },
            { name: "Gray", theme: "Gray", path: "https://bootswatch.com/cerulean/bootstrap.min.css" }
        ];

        cssInjector.removeAll();
        cssInjector.add("https://bootswatch.com/spacelab/bootstrap.min.css");

        $scope.draggableObjects = [
       { id: 1, image: "http://104.196.34.106/img/EHR.jpg", index: 0, drag: true, openInTab: false, link: "http://google.com" },
       { id: 2, image: "http://104.196.34.106/img/medsis-hrm.jpg", index: 1, drag: false, openInTab: false, link: "http://yahoo.com" },
       { id: 3, image: "http://104.196.34.106/img/insight1.png", index: 2, drag: true, openInTab: true, link: "http://youtube.com" },
       { id: 4, image: "http://104.196.34.106/img/logo_front2.png", index: 3, drag: true, openInTab: true, link: "http://facebook.com" },
       { id: 5, image: "http://104.196.34.106/img/logo_front2.png", index: 4, drag: true, openInTab: true, link: "http://facebook.com" },
       { id: 6, image: "http://104.196.34.106/img/insight1.png", index: 5, drag: true, openInTab: true, link: "http://youtube.com" },
        ];
    }

    $scope.GetSelectedTheme = function (selectedTheme)
    {
        var theme = $scope.themes.filter(function (el)
        {
            return el.theme === selectedTheme.theme
        });

        cssInjector.removeAll();
        cssInjector.add(theme[0].path);
    };

    $scope.DropEvent = function (event, ui) {
        var targetIndex = $(event.target).index();

        for (i = 0; i <= $scope.draggableObjects.length; i++) {
            if ($scope.draggableObjects[i].index === targetIndex) {

                findTargetIndexToReplaceIndexWithNewIndex = $scope.draggableObjects[i];
                break;
            }
        }

        for (i = 0; i <= $scope.draggableObjects.length; i++) {
            if ($scope.draggableObjects[i].index === $scope.currentIndex) {
                $scope.draggableObjects[i].index = targetIndex;
                break;
            }
        }

        for (i = 0; i <= $scope.draggableObjects.length; i++) {
            findTargetIndexToReplaceIndexWithNewIndex.index = $scope.currentIndex;
            if ($scope.draggableObjects[i].id === findTargetIndexToReplaceIndexWithNewIndex.id) {
                $scope.draggableObjects[i].index = $scope.currentIndex;
                break;
            }
        }

    }

    $scope.DragStart = function (event, ui) {
        $scope.currentIndex = $(event.target).index();
    }


    $scope.LogOut = function ()
    {
    }


    $scope.changeLanguage = function (locale) {
        LocaleService.setLocaleByDisplayName(locale);
    }

    $scope.init();
});

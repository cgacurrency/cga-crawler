webpackJsonp([65],{508:function(e,a,r){!function(a,r){e.exports=r()}(0,function(){"use strict";return[{locale:"ru",pluralRuleFunction:function(e,a){var r=String(e).split("."),t=r[0],n=!r[1],o=t.slice(-1),l=t.slice(-2);return a?"other":n&&1==o&&11!=l?"one":n&&o>=2&&o<=4&&(l<12||l>14)?"few":n&&0==o||n&&o>=5&&o<=9||n&&l>=11&&l<=14?"many":"other"},fields:{year:{displayName:"\u0433\u043e\u0434",relative:{0:"\u0432 \u044d\u0442\u043e\u043c \u0433\u043e\u0434\u0443",1:"\u0432 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u043c \u0433\u043e\u0434\u0443","-1":"\u0432 \u043f\u0440\u043e\u0448\u043b\u043e\u043c \u0433\u043e\u0434\u0443"},relativeTime:{future:{one:"\u0447\u0435\u0440\u0435\u0437 {0} \u0433\u043e\u0434",few:"\u0447\u0435\u0440\u0435\u0437 {0} \u0433\u043e\u0434\u0430",many:"\u0447\u0435\u0440\u0435\u0437 {0} \u043b\u0435\u0442",other:"\u0447\u0435\u0440\u0435\u0437 {0} \u0433\u043e\u0434\u0430"},past:{one:"{0} \u0433\u043e\u0434 \u043d\u0430\u0437\u0430\u0434",few:"{0} \u0433\u043e\u0434\u0430 \u043d\u0430\u0437\u0430\u0434",many:"{0} \u043b\u0435\u0442 \u043d\u0430\u0437\u0430\u0434",other:"{0} \u0433\u043e\u0434\u0430 \u043d\u0430\u0437\u0430\u0434"}}},month:{displayName:"\u043c\u0435\u0441\u044f\u0446",relative:{0:"\u0432 \u044d\u0442\u043e\u043c \u043c\u0435\u0441\u044f\u0446\u0435",1:"\u0432 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u043c \u043c\u0435\u0441\u044f\u0446\u0435","-1":"\u0432 \u043f\u0440\u043e\u0448\u043b\u043e\u043c \u043c\u0435\u0441\u044f\u0446\u0435"},relativeTime:{future:{one:"\u0447\u0435\u0440\u0435\u0437 {0} \u043c\u0435\u0441\u044f\u0446",few:"\u0447\u0435\u0440\u0435\u0437 {0} \u043c\u0435\u0441\u044f\u0446\u0430",many:"\u0447\u0435\u0440\u0435\u0437 {0} \u043c\u0435\u0441\u044f\u0446\u0435\u0432",other:"\u0447\u0435\u0440\u0435\u0437 {0} \u043c\u0435\u0441\u044f\u0446\u0430"},past:{one:"{0} \u043c\u0435\u0441\u044f\u0446 \u043d\u0430\u0437\u0430\u0434",few:"{0} \u043c\u0435\u0441\u044f\u0446\u0430 \u043d\u0430\u0437\u0430\u0434",many:"{0} \u043c\u0435\u0441\u044f\u0446\u0435\u0432 \u043d\u0430\u0437\u0430\u0434",other:"{0} \u043c\u0435\u0441\u044f\u0446\u0430 \u043d\u0430\u0437\u0430\u0434"}}},day:{displayName:"\u0434\u0435\u043d\u044c",relative:{0:"\u0441\u0435\u0433\u043e\u0434\u043d\u044f",1:"\u0437\u0430\u0432\u0442\u0440\u0430",2:"\u043f\u043e\u0441\u043b\u0435\u0437\u0430\u0432\u0442\u0440\u0430","-2":"\u043f\u043e\u0437\u0430\u0432\u0447\u0435\u0440\u0430","-1":"\u0432\u0447\u0435\u0440\u0430"},relativeTime:{future:{one:"\u0447\u0435\u0440\u0435\u0437 {0} \u0434\u0435\u043d\u044c",few:"\u0447\u0435\u0440\u0435\u0437 {0} \u0434\u043d\u044f",many:"\u0447\u0435\u0440\u0435\u0437 {0} \u0434\u043d\u0435\u0439",other:"\u0447\u0435\u0440\u0435\u0437 {0} \u0434\u043d\u044f"},past:{one:"{0} \u0434\u0435\u043d\u044c \u043d\u0430\u0437\u0430\u0434",few:"{0} \u0434\u043d\u044f \u043d\u0430\u0437\u0430\u0434",many:"{0} \u0434\u043d\u0435\u0439 \u043d\u0430\u0437\u0430\u0434",other:"{0} \u0434\u043d\u044f \u043d\u0430\u0437\u0430\u0434"}}},hour:{displayName:"\u0447\u0430\u0441",relative:{0:"\u0432 \u044d\u0442\u043e\u043c \u0447\u0430\u0441\u0435"},relativeTime:{future:{one:"\u0447\u0435\u0440\u0435\u0437 {0} \u0447\u0430\u0441",few:"\u0447\u0435\u0440\u0435\u0437 {0} \u0447\u0430\u0441\u0430",many:"\u0447\u0435\u0440\u0435\u0437 {0} \u0447\u0430\u0441\u043e\u0432",other:"\u0447\u0435\u0440\u0435\u0437 {0} \u0447\u0430\u0441\u0430"},past:{one:"{0} \u0447\u0430\u0441 \u043d\u0430\u0437\u0430\u0434",few:"{0} \u0447\u0430\u0441\u0430 \u043d\u0430\u0437\u0430\u0434",many:"{0} \u0447\u0430\u0441\u043e\u0432 \u043d\u0430\u0437\u0430\u0434",other:"{0} \u0447\u0430\u0441\u0430 \u043d\u0430\u0437\u0430\u0434"}}},minute:{displayName:"\u043c\u0438\u043d\u0443\u0442\u0430",relative:{0:"\u0432 \u044d\u0442\u0443 \u043c\u0438\u043d\u0443\u0442\u0443"},relativeTime:{future:{one:"\u0447\u0435\u0440\u0435\u0437 {0} \u043c\u0438\u043d\u0443\u0442\u0443",few:"\u0447\u0435\u0440\u0435\u0437 {0} \u043c\u0438\u043d\u0443\u0442\u044b",many:"\u0447\u0435\u0440\u0435\u0437 {0} \u043c\u0438\u043d\u0443\u0442",other:"\u0447\u0435\u0440\u0435\u0437 {0} \u043c\u0438\u043d\u0443\u0442\u044b"},past:{one:"{0} \u043c\u0438\u043d\u0443\u0442\u0443 \u043d\u0430\u0437\u0430\u0434",few:"{0} \u043c\u0438\u043d\u0443\u0442\u044b \u043d\u0430\u0437\u0430\u0434",many:"{0} \u043c\u0438\u043d\u0443\u0442 \u043d\u0430\u0437\u0430\u0434",other:"{0} \u043c\u0438\u043d\u0443\u0442\u044b \u043d\u0430\u0437\u0430\u0434"}}},second:{displayName:"\u0441\u0435\u043a\u0443\u043d\u0434\u0430",relative:{0:"\u0441\u0435\u0439\u0447\u0430\u0441"},relativeTime:{future:{one:"\u0447\u0435\u0440\u0435\u0437 {0} \u0441\u0435\u043a\u0443\u043d\u0434\u0443",few:"\u0447\u0435\u0440\u0435\u0437 {0} \u0441\u0435\u043a\u0443\u043d\u0434\u044b",many:"\u0447\u0435\u0440\u0435\u0437 {0} \u0441\u0435\u043a\u0443\u043d\u0434",other:"\u0447\u0435\u0440\u0435\u0437 {0} \u0441\u0435\u043a\u0443\u043d\u0434\u044b"},past:{one:"{0} \u0441\u0435\u043a\u0443\u043d\u0434\u0443 \u043d\u0430\u0437\u0430\u0434",few:"{0} \u0441\u0435\u043a\u0443\u043d\u0434\u044b \u043d\u0430\u0437\u0430\u0434",many:"{0} \u0441\u0435\u043a\u0443\u043d\u0434 \u043d\u0430\u0437\u0430\u0434",other:"{0} \u0441\u0435\u043a\u0443\u043d\u0434\u044b \u043d\u0430\u0437\u0430\u0434"}}}}},{locale:"ru-BY",parentLocale:"ru"},{locale:"ru-KG",parentLocale:"ru"},{locale:"ru-KZ",parentLocale:"ru"},{locale:"ru-MD",parentLocale:"ru"},{locale:"ru-UA",parentLocale:"ru"}]})}});
//# sourceMappingURL=65.22d3bf8c.chunk.js.map
var languages = [
    /*{"code":"ab","name":"Abkhaz","nativeName":"аҧсуа"},*/
    /*{"code":"aa","name":"Afar","nativeName":"Afaraf"},*/
    {"code":"za","name":"Afrikaans","nativeName":"Afrikaans"},
    /*{"code":"ak","name":"Akan","nativeName":"Akan"},*/
    {"code":"al","name":"Albanian","nativeName":"Shqip"},
    /*{"code":"am","name":"Amharic","nativeName":"አማርኛ"},*/
    {"code":"sa","name":"Arabic","nativeName":"العربية"},
    /*{"code":"an","name":"Aragonese","nativeName":"Aragonés"},*/
    {"code":"am","name":"Armenian","nativeName":"Հայերեն"},
    /*{"code":"as","name":"Assamese","nativeName":"অসমীয়া"},*/
    /*{"code":"av","name":"Avaric","nativeName":"авар мацӀ, магӀарул мацӀ"},*/
    /*{"code":"ae","name":"Avestan","nativeName":"avesta"},*/
    {"code":"pe","name":"Aymara","nativeName":"aymar aru"},
    {"code":"az","name":"Azerbaijani","nativeName":"azərbaycan dili"},
    /*{"code":"bm","name":"Bambara","nativeName":"bamanankan"},*/
    /*{"code":"ba","name":"Bashkir","nativeName":"башҡорт теле"},*/
    /*{"code":"eu","name":"Basque","nativeName":"euskara, euskera"},*/
    {"code":"id","name":"Belarusian","nativeName":"Беларуская"},
    {"code":"bd","name":"Bengali","nativeName":"বাংলা"},
    /*{"code":"bh","name":"Bihari","nativeName":"भोजपुरी"},*/
    {"code":"vu","name":"Bislama","nativeName":"Bislama"},
    {"code":"mk","name":"Bosnian","nativeName":"bosanski jezik"},
    /*{"code":"br","name":"Breton","nativeName":"brezhoneg"},*/
    {"code":"cs","name":"Bulgarian","nativeName":"български език"},
    {"code":"mm","name":"Burmese","nativeName":"ဗမာစာ"},
    {"code":"ad","name":"Catalan; Valencian","nativeName":"Català"},
    {"code":"gu","name":"Chamorro","nativeName":"Chamoru"},
    {"code":"ru","name":"Chechen","nativeName":"нохчийн мотт"},
    {"code":"zm","name":"Chichewa; Chewa; Nyanja","nativeName":"chiCheŵa, chinyanja"},
    {"code":"cn","name":"Chinese","nativeName":"中文 (Zhōngwén), 汉语, 漢語"},
    {"code":"ru","name":"Chuvash","nativeName":"чӑваш чӗлхи"},
    {"code":"ie","name":"Cornish","nativeName":"Kernewek"},
    {"code":"fr","name":"Corsican","nativeName":"corsu, lingua corsa"},
    /*{"code":"cr","name":"Cree","nativeName":"ᓀᐦᐃᔭᐍᐏᐣ"},*/
    {"code":"hr","name":"Croatian","nativeName":"hrvatski"},
    {"code":"cz","name":"Czech","nativeName":"česky, čeština"},
    {"code":"is","name":"Danish","nativeName":"dansk"},
    {"code":"mv","name":"Divehi; Dhivehi; Maldivian;","nativeName":"ދިވެހި"},
    {"code":"nl","name":"Dutch","nativeName":"Nederlands, Vlaams"},
    {"code":"en","name":"English","nativeName":"English"},
    /*{"code":"eo","name":"Esperanto","nativeName":"Esperanto"},*/
    /*{"code":"et","name":"Estonian","nativeName":"eesti, eesti keel"},*/
    {"code":"bj","name":"Ewe","nativeName":"Eʋegbe"},
    {"code":"fo","name":"Faroese","nativeName":"føroyskt"},
    {"code":"fj","name":"Fijian","nativeName":"vosa Vakaviti"},
    {"code":"fi","name":"Finnish","nativeName":"suomi, suomen kieli"},
    {"code":"fr","name":"French","nativeName":"français, langue française"},
    {"code":"za","name":"Fula; Fulah; Pulaar; Pular","nativeName":"Fulfulde, Pulaar, Pular"},
    /*{"code":"gl","name":"Galician","nativeName":"Galego"},*/
    {"code":"ge","name":"Georgian","nativeName":"ქართული"},
    {"code":"de","name":"German","nativeName":"Deutsch"},
    {"code":"it","name":"Greek, Modern","nativeName":"Ελληνικά"},
    {"code":"py","name":"Guaraní","nativeName":"Avañeẽ"},
    {"code":"in","name":"Gujarati","nativeName":"ગુજરાતી"},
    {"code":"ht","name":"Haitian; Haitian Creole","nativeName":"Kreyòl ayisyen"},
    /*{"code":"ha","name":"Hausa","nativeName":"Hausa, هَوُسَ"},*/
    {"code":"il","name":"Hebrew (modern)","nativeName":"עברית"},
    {"code":"na","name":"Herero","nativeName":"Otjiherero"},
    {"code":"in","name":"Hindi","nativeName":"हिन्दी, हिंदी"},
    {"code":"pg","name":"Hiri Motu","nativeName":"Hiri Motu"},
    {"code":"hu","name":"Hungarian","nativeName":"Magyar"},
    /*{"code":"ia","name":"Interlingua","nativeName":"Interlingua"},*/
    {"code":"id","name":"Indonesian","nativeName":"Bahasa Indonesia"},
    /*{"code":"ie","name":"Interlingue","nativeName":"Originally called Occidental; then Interlingue after WWII"},*/
    {"code":"ie","name":"Irish","nativeName":"Gaeilge"},
    {"code":"ng","name":"Igbo","nativeName":"Asụsụ Igbo"},
    /*{"code":"ik","name":"Inupiaq","nativeName":"Iñupiaq, Iñupiatun"},*/
    /*{"code":"io","name":"Ido","nativeName":"Ido"},*/
    {"code":"is","name":"Icelandic","nativeName":"Íslenska"},
    {"code":"it","name":"Italian","nativeName":"Italiano"},
    /*{"code":"iu","name":"Inuktitut","nativeName":"ᐃᓄᒃᑎᑐᑦ"},*/
    {"code":"jp","name":"Japanese","nativeName":"日本語 (にほんご／にっぽんご)"},
    /*{"code":"sr","name":"Javanese","nativeName":"basa Jawa"},*/
    {"code":"gl","name":"Kalaallisut, Greenlandic","nativeName":"kalaallisut, kalaallit oqaasii"},
    /*{"code":"kn","name":"Kannada","nativeName":"ಕನ್ನಡ"},*/
    {"code":"ne","name":"Kanuri","nativeName":"Kanuri"},
    /*{"code":"ks","name":"Kashmiri","nativeName":"कश्मीरी, كشميري‎"},*/
    /*{"code":"kk","name":"Kazakh","nativeName":"Қазақ тілі"},*/
    {"code":"kh","name":"Khmer","nativeName":"ភាសាខ្មែរ"},
    /*{"code":"ki","name":"Kikuyu, Gikuyu","nativeName":"Gĩkũyũ"},*/
    {"code":"rw","name":"Kinyarwanda","nativeName":"Ikinyarwanda"},
    /*{"code":"ky","name":"Kirghiz, Kyrgyz","nativeName":"кыргыз тили"},*/
    /*{"code":"kv","name":"Komi","nativeName":"коми кыв"},*/
    /*{"code":"kg","name":"Kongo","nativeName":"KiKongo"},*/
    {"code":"kp","name":"Korean","nativeName":"한국어 (韓國語), 조선말 (朝鮮語)"},
    {"code":"iq","name":"Kurdish","nativeName":"Kurdî, كوردی‎"},
    {"code":"na","name":"Kwanyama, Kuanyama","nativeName":"Kuanyama"},
    {"code":"va","name":"Latin","nativeName":"latine, lingua latina"},
    {"code":"lu","name":"Luxembourgish, Letzeburgesch","nativeName":"Lëtzebuergesch"},
    {"code":"ug","name":"Luganda","nativeName":"Luganda"},
    {"code":"an","name":"Limburgish, Limburgan, Limburger","nativeName":"Limburgs"},
    {"code":"cd","name":"Lingala","nativeName":"Lingála"},
    {"code":"la","name":"Lao","nativeName":"ພາສາລາວ"},
    {"code":"lt","name":"Lithuanian","nativeName":"lietuvių kalba"},
    /*{"code":"lu","name":"Luba-Katanga","nativeName":""},*/
    {"code":"lv","name":"Latvian","nativeName":"latviešu valoda"},
    {"code":"im","name":"Manx","nativeName":"Gaelg, Gailck"},
    {"code":"mk","name":"Macedonian","nativeName":"македонски јазик"},
    /*{"code":"mg","name":"Malagasy","nativeName":"Malagasy fiteny"},*/
    {"code":"my","name":"Malay","nativeName":"bahasa Melayu, بهاس ملايو‎"},
    /*{"code":"ml","name":"Malayalam","nativeName":"മലയാളം"},*/
    {"code":"mt","name":"Maltese","nativeName":"Malti"},
    {"code":"nz","name":"Māori","nativeName":"te reo Māori"},
    /*{"code":"mr","name":"Marathi (Marāṭhī)","nativeName":"मराठी"},*/
    {"code":"mh","name":"Marshallese","nativeName":"Kajin M̧ajeļ"},
    {"code":"mn","name":"Mongolian","nativeName":"монгол"},
    /*{"code":"na","name":"Nauru","nativeName":"Ekakairũ Naoero"},*/
    /*{"code":"nv","name":"Navajo, Navaho","nativeName":"Diné bizaad, Dinékʼehǰí"},*/
    /*{"code":"no","name":"Norwegian Bokmål","nativeName":"Norsk bokmål"},*/
    /*{"code":"nd","name":"North Ndebele","nativeName":"isiNdebele"},*/
    {"code":"np","name":"Nepali","nativeName":"नेपाली"},
    /*{"code":"ng","name":"Ndonga","nativeName":"Owambo"},*/
    /*{"code":"nn","name":"Norwegian Nynorsk","nativeName":"Norsk nynorsk"},*/
    {"code":"no","name":"Norwegian","nativeName":"Norsk"},
    {"code":"cn","name":"Nuosu","nativeName":"ꆈꌠ꒿ Nuosuhxop"},
    /*{"code":"nr","name":"South Ndebele","nativeName":"isiNdebele"},*/
    /*{"code":"oc","name":"Occitan","nativeName":"Occitan"},*/
    /*{"code":"oj","name":"Ojibwe, Ojibwa","nativeName":"ᐊᓂᔑᓈᐯᒧᐎᓐ"},*/
    /*{"code":"cu","name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic","nativeName":"ѩзыкъ словѣньскъ"},*/
    /*{"code":"om","name":"Oromo","nativeName":"Afaan Oromoo"},*/
    /*{"code":"or","name":"Oriya","nativeName":"ଓଡ଼ିଆ"},*/
    /*{"code":"os","name":"Ossetian, Ossetic","nativeName":"ирон æвзаг"},*/
    /*{"code":"pa","name":"Panjabi, Punjabi","nativeName":"ਪੰਜਾਬੀ, پنجابی‎"},*/
    /*{"code":"pi","name":"Pāli","nativeName":"पाऴि"},*/
    {"code":"af","name":"Persian","nativeName":"فارسی"},
    /*{"code":"pl","name":"Polish","nativeName":"polski"},*/
    /*{"code":"ps","name":"Pashto, Pushto","nativeName":"پښتو"},*/
    {"code":"pt","name":"Portuguese","nativeName":"Português"},
    /*{"code":"qu","name":"Quechua","nativeName":"Runa Simi, Kichwa"},*/
    {"code":"ch","name":"Romansh","nativeName":"rumantsch grischun"},
    /*{"code":"rn","name":"Kirundi","nativeName":"kiRundi"},*/
    {"code":"ro","name":"Romanian, Moldavian, Moldovan","nativeName":"română"},
    {"code":"ru","name":"Russian","nativeName":"русский язык"},
    /*{"code":"sa","name":"Sanskrit (Saṁskṛta)","nativeName":"संस्कृतम्"},*/
    /*{"code":"sc","name":"Sardinian","nativeName":"sardu"},*/
    /*{"code":"sd","name":"Sindhi","nativeName":"सिन्धी, سنڌي، سندھی‎"},*/
    /*{"code":"se","name":"Northern Sami","nativeName":"Davvisámegiella"},*/
    {"code":"ws","name":"Samoan","nativeName":"gagana faa Samoa"},
    /*{"code":"sg","name":"Sango","nativeName":"yângâ tî sängö"},*/
    {"code":"cs","name":"Serbian","nativeName":"српски језик"},
    {"code":"gla","name":"Scottish Gaelic; Gaelic","nativeName":"Gàidhlig"},
    {"code":"zw","name":"Shona","nativeName":"chiShona"},
    {"code":"lk","name":"Sinhala, Sinhalese","nativeName":"සිංහල"},
    {"code":"ua","name":"Slovak","nativeName":"slovenčina"},
    {"code":"si","name":"Slovene","nativeName":"slovenščina"},
    /*{"code":"so","name":"Somali","nativeName":"Soomaaliga, af Soomaali"},*/
    /*{"code":"st","name":"Southern Sotho","nativeName":"Sesotho"},*/
    /*{"code":"es","name":"Spanish; Castilian","nativeName":"español, castellano"},*/
    /*{"code":"su","name":"Sundanese","nativeName":"Basa Sunda"},*/
    {"code":"ke","name":"Swahili","nativeName":"Kiswahili"},
    /*{"code":"ss","name":"Swati","nativeName":"SiSwati"},*/
    {"code":"se","name":"Swedish","nativeName":"svenska"},
    /*{"code":"ta","name":"Tamil","nativeName":"தமிழ்"},*/
    /*{"code":"te","name":"Telugu","nativeName":"తెలుగు"},*/
    {"code":"tj","name":"Tajik","nativeName":"тоҷикӣ, toğikī, تاجیکی‎"},
    /*{"code":"th","name":"Thai","nativeName":"ไทย"},*/
    {"code":"et","name":"Tigrinya","nativeName":"ትግርኛ"},
    /*{"code":"np","name":"Tibetan Standard, Tibetan, Central","nativeName":"བོད་ཡིག"},*/
    /*{"code":"tk","name":"Turkmen","nativeName":"Türkmen, Түркмен"},*/
    {"code":"ph","name":"Tagalog","nativeName":"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},
    {"code":"bw","name":"Tswana","nativeName":"Setswana"},
    /*{"code":"to","name":"Tonga (Tonga Islands)","nativeName":"faka Tonga"},*/
    {"code":"tr","name":"Turkish","nativeName":"Türkçe"},
    /*{"code":"ts","name":"Tsonga","nativeName":"Xitsonga"},*/
    /*{"code":"tt","name":"Tatar","nativeName":"татарча, tatarça, تاتارچا‎"},*/
    /*{"code":"tw","name":"Twi","nativeName":"Twi"},*/
    /*{"code":"ty","name":"Tahitian","nativeName":"Reo Tahiti"},*/
    /*{"code":"ug","name":"Uighur, Uyghur","nativeName":"Uyƣurqə, ئۇيغۇرچە‎"},*/
    {"code":"uk","name":"Ukrainian","nativeName":"українська"},
    {"code":"pk","name":"Urdu","nativeName":"اردو"},
    /*{"code":"uz","name":"Uzbek","nativeName":"zbek, Ўзбек, أۇزبېك‎"},*/
    /*{"code":"ve","name":"Venda","nativeName":"Tshivenḓa"},*/
    {"code":"vn","name":"Vietnamese","nativeName":"Tiếng Việt"},
    /*{"code":"vo","name":"Volapük","nativeName":"Volapük"},*/
    /*{"code":"wa","name":"Walloon","nativeName":"Walon"},*/
    {"code":"wales","name":"Welsh","nativeName":"Cymraeg"},
    {"code":"gm","name":"Wolof","nativeName":"Wollof"},
    /*{"code":"fy","name":"Western Frisian","nativeName":"Frysk"},*/
    {"code":"zw","name":"Xhosa","nativeName":"isiXhosa"},
    /*{"code":"pl","name":"Yiddish","nativeName":"ייִדיש"},*/
    {"code":"ng","name":"Yoruba","nativeName":"Yorùbá"},
    {"code":"cn","name":"Zhuang, Chuang","nativeName":"Saɯ cueŋƅ, Saw cuengh"}
];
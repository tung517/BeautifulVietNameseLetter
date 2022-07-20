const utils = {}

utils.log = function(...args){
    controller.doLog ? console.log(...args) : null ;
}

utils.isLetter = function(c) {
    return !/[`~!@#$%^&*()_+\-=\[\]\{\};':",./<>?\\|0-9]+/.test(c)
}

utils.getAccent = function (char){
    char = char.toLowerCase();
    let accentList = {
        'acute':'áắấóốớéếíúứý',
        'lower':'àằầòồờèềìùừỳ',
        'rising':'ảẳẩỏổởẻểỉủửỷ',
        'raised':'ãẵẫõỗỡẽễĩũữỹ',
        'heavy':'ạặậọộợẹệịụựỵ',
    }
    for(const [accent, characters] of Object.entries(accentList)){
        //special cases
        if(/ooc/.test(char)){return "level";}
        if(/oon/.test(char)){return "level";}
        if(/oòn/.test(char)){return "lower";}
        if(/oón/.test(char)){return "acute";}
        if(/oóc/.test(char)){return "acute";}
        if(/oọc/.test(char)){return "heavy";}
        //normal cases
        var re = new RegExp('['+characters+']', 'g');
        if(re.test(char)){
            return accent;
        }
    }
    return 'level';
}

utils.isUpperCase = function (str){
    if(str.length != 1){return false;};
    let uppercaseLetters = [
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "DĐ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "IÌỈĨÍỊ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "YỲỶỸÝỴ",
        "BCGHKLMNPQRSTVX"   
    ]
    for (var i=0; i<uppercaseLetters.length; i++) {
        var re = new RegExp('[' + uppercaseLetters[i] + ']', 'g');
        if(re.test(str)){
            return true;
        }
    }
    return false;
}

utils.removeAccents = function (str){
    // if(/ooc/.test(char) || /oọc/.test(char) || /oóc/.test(char)){return "ooc";}
    // if(/oon/.test(char)){return "oon";}
    var AccentsMap = [
        "aàảãáạ",
        "ăằẳẵắặ",
        "âầẩẫấậ",
        "AÀẢÃÁẠ",
        "ĂẰẲẴẮẶ",
        "ÂẦẨẪẤẬ",
        "eèẻẽéẹ",
        "êềểễếệ",
        "EÈẺẼÉẸ",
        "ÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọ",
        "ôồổỗốộ",
        "ơờởỡớợ",
        "OÒỎÕÓỌ",
        "ÔỒỔỖỐỘ",
        "ƠỜỞỠỚỢ",
        "uùủũúụ",
        "ưừửữứự",
        "UÙỦŨÚỤ",
        "ƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}

utils.stripHtml = function (str){
    return str.replace(/(<([^>]+)>)/gi, "");
}

utils.decodeHTMLEntities = function (text) {
    // Create a new element or use one from cache, to save some element creation overhead
    const el = decodeHTMLEntities.__cache_data_element 
            = decodeHTMLEntities.__cache_data_element 
            || document.createElement('div');
    
    const enc = text
        // Prevent any mixup of existing pattern in text
        .replace(/⪪/g, '⪪#')
        // Encode entities in special format. This will prevent native element encoder to replace any amp characters
        .replace(/&([a-z1-8]{2,31}|#x[0-9a-f]+|#\d+);/gi, '⪪$1⪫');

    // Encode any HTML tags in the text to prevent script injection
    el.textContent = enc;

    // Decode entities from special format, back to their original HTML entities format
    el.innerHTML = el.innerHTML
        .replace(/⪪([a-z1-8]{2,31}|#x[0-9a-f]+|#\d+)⪫/gi, '&$1;')
        .replace(/#⪫/g, '⪫');

    // Get the decoded HTML entities
    const dec = el.textContent;
    
    // Clear the element content, in order to preserve a bit of memory (it is just the text may be pretty big)
    el.textContent = '';

    return dec;
}

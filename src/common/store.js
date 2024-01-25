
let state = {
    token:localStorage.getItem("token")||"",
    userinfo:localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):{},
    language:localStorage.getItem("language")||jQuery.i18n.browserLang(),
}

let getter = {
    ajax_language:()=>{
        return state.language
    }
}

let setstate = {
    token(token){
        state.token = token;
        localStorage.setItem("token", token);
    },
    language(language){
        if(state.language != language){
            state.language = language;
            localStorage.setItem("language", language);
            location.reload()
        }
    },
    userinfo(userinfo){
        state.userinfo = userinfo;
        localStorage.setItem("userinfo", JSON.stringify(userinfo));
    }
}

export default {
    state,
    getter,
    setstate
}

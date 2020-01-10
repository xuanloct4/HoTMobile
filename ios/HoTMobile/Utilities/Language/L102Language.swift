//
//  L102Language.swift
//  ami-ios-base
//
//  Created by Punnakhun on 17/1/2561 BE.
//  Copyright © 2561 Ascend. All rights reserved.
//

import UIKit

// constants
let APPLE_LANGUAGE_KEY = "AppleLanguages"
let APPLE_I18N_LANGUAGE_KEY = "i18n_language"


/// L102Language
public class L102Language {
    /// get current Apple language
    public class func currentAppleLanguage() -> String{
        let userdef = UserDefaults.standard
        let langArray = userdef.object(forKey: APPLE_LANGUAGE_KEY) as! [String]
        let current = langArray[0] as! String
//        let endIndex = current.startIndex
//        let index = current.index(endIndex, offsetBy: 2)
//        let currentWithoutLocale = current[..<index]
//        return String(currentWithoutLocale)
        return current
    }
    
    public class func currentAppleLanguageFull() -> String{
        let userdef = UserDefaults.standard
        let langArray = userdef.object(forKey: APPLE_LANGUAGE_KEY) as! NSArray
        let current = langArray.firstObject as! String
        return current
    }
    
    
    /// set @lang to be the first in Applelanguages list
    public class func setAppleLAnguageTo(lang: String) {
        let userdef = UserDefaults.standard
        userdef.set([lang,currentAppleLanguage()], forKey: APPLE_LANGUAGE_KEY)
        userdef.set([lang,currentAppleLanguage()], forKey: APPLE_I18N_LANGUAGE_KEY)
        userdef.synchronize()
    }
}

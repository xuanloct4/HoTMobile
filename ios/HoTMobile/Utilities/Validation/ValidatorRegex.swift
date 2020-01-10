//
//  ValidatorRegex.swift
//  ami-ios-regional-base
//
//  Created by loctv on 10/18/19.
//  Copyright © 2019 loctv. All rights reserved.
//

import UIKit

public class ValidatorRegex: Validator {
    
    public var regEx:String?
    
    public init(regEx:String?, error: String) {
        super.init()
        self.regEx = regEx
        self.error = error
    }

    override public func validate(params: [ValidableParams : Any], _ result: (Bool, String?) -> ()) {
        guard let text = params[.text] as? String else {
            result(false, self.error)
            return
        }
        if let regex = self.regEx {
            let test = NSPredicate(format:"SELF MATCHES %@", regex)
            let isValid = test.evaluate(with: text)
            
            if isValid {
                result(true, nil)
            } else {
                result(false, self.error)
            }
        } else {
            result(true, nil)
        }
    }
}

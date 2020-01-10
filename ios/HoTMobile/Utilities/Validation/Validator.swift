//
//  Validator.swift
//  ami-ios-base
//
//  Created by Viliam Straka on 6/12/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import Foundation

public enum ValidableParams: String {
    case text = "text"
}

public class Validator {
    
    public class func validate(_ validable: Validable, result: @escaping (_ valid: Bool, _ error:String, _ validationID:Int) -> ()) -> Int {
        let validationID = Utils.randomInt()
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.001) {
            if validable.getValidators().count == 0 {
                result(true, "", validationID)
            } else {
                Validator.validateNext(validable, position: 0, validationID: validationID, result: result, isValid: true)
            }
        }
        return validationID
    }
    
    public class func validateNext(_ validable: Validable, position: Int, validationID: Int, result: (_ valid: Bool, _ error: String, _ validationID: Int) -> (), isValid: Bool) {
        
        if position >= validable.getValidators().count {
            result(true && isValid, "", validationID)
        } else {
            let validator = validable.getValidators()[position]
            validator.validate(params: validable.getParams(), { (valid, error) in
                if valid {
                    Validator.validateNext(validable, position: position+1, validationID: validationID, result: result, isValid: true && isValid)
                } else {
                    let returnError = error ?? validator.error
                    result(false, returnError, validationID)
                }
            })
        }
    }
    
    var error: String = ""
    
    
    public func validate(params: [ValidableParams:Any], _ result: (_ success: Bool, _ error: String?) -> ()) {
        
    }
}

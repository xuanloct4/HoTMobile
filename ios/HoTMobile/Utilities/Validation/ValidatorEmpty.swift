//
//  ValidatorEmpty.swift
//  ami-ios-base
//
//  Created by Viliam Straka on 13/12/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import Foundation

public class ValidatorEmpty: Validator {

    public init(error: String) {
        super.init()
        self.error = error
    }
    
    override public func validate(params: [ValidableParams : Any], _ result: (Bool, String?) -> ()) {
        guard let length = params[.text] as? String else {
            result(false, self.error)
            return
        }
        if length.count == 0 {
            result(false, self.error)
        } else {
            result(true, nil)
        }
    }
}

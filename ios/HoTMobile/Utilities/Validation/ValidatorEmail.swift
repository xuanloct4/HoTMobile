//
//  ValidatorEmail.swift
//  ami-ios-base
//
//  Created by loctv on 3/9/18.
//  Copyright © 2018 Ascend. All rights reserved.
//

import UIKit

public class ValidatorEmail: ValidatorRegex {
    
    public var emailRegEx = "[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9][A-Za-z0-9-]*(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})"
    
     public init(error: String) {
        super.init(regEx: emailRegEx, error: error)
    }
}

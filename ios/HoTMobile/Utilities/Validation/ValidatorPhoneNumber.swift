//
//  ValidatorPhoneNumber.swift
//  ami-ios-base
//
//  Created by loctv on 3/9/18.
//  Copyright © 2018 Ascend. All rights reserved.
//

import UIKit

public class ValidatorPhoneNumber: ValidatorRegex {
    var phoneReg = "\\d{10,14}"

     public init(error: String) {
        super.init(regEx: phoneReg, error: error)
    }
}

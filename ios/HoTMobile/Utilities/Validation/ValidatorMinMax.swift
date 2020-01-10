//
//  ValidatorMinLength.swift
//  ami-ios-base
//
//  Created by Viliam Straka on 6/12/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import UIKit

public class ValidatorMinMax: ValidatorRegex {
    
    public init(min: Int? = nil, max: Int? = nil, error: String) {
        super.init(regEx: nil, error: error)
        
        var reg:String?
        if let min = min, let max = max {
            reg = "\\d{\(min),\(max)}"
        } else if let min = min {
            reg = "\\d{\(min),}"
        } else if let max = max {
            reg = "\\d{,\(max)}"
        }
        
        self.regEx = reg
    }
}

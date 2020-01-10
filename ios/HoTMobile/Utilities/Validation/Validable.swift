//
//  Validable.swift
//  ami-ios-base
//
//  Created by Viliam Straka on 6/12/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import UIKit

public protocol Validable {
    func addValidator(_ validator: Validator)
    func validate(silent: Bool, _ result: ((_ valid: Bool, _ error: String?) -> ())?)
    func getValidators() -> [Validator]
    func getParams() -> [ValidableParams:Any]
}

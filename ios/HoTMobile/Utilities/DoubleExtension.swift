//
//  DoubleExtension.swift
//  ami-ios-base
//
//  Created by Nonthanun Sudlapa on 12/29/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import UIKit

extension Double {
    public func formatBalance() -> String {
        let numberFormatter = NumberFormatter()
        numberFormatter.numberStyle = NumberFormatter.Style.decimal
        let formattedNumber = numberFormatter.string(from: NSNumber(value:self))
        return formattedNumber!
    }
}

//
//  FileSystem.swift
//  ami-ios-base-customer
//
//  Created by  Thế Anh  on 11/29/19.
//  Copyright © 2019 loctv. All rights reserved.
//

import Foundation

public class FileSystem {
    
    public static let documentsDirectory: URL = {
        let urls = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
        return urls[urls.endIndex - 1]
    }()
    
    public static let cacheDirectory: URL = {
        let urls = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)
        return urls[urls.endIndex - 1]
    }()
    
    public static let downloadDirectory: URL = {
        let directory: URL = FileSystem.documentsDirectory.appendingPathComponent("/Download/")
        return directory
    }()
}

import Foundation

extension Date {
  public init?(ISO8601: String) {
    let isoFormatter = ISO8601DateFormatter()

    guard let date = isoFormatter.date(from: ISO8601) else { return nil }
    self = date
  }
}

// Leitor de texto da Apple (Vision) para o texto_na_tela.py.
// Uso: ocr_vision <pasta com f_*.jpg> <saida.json>
// Saída: { "f_00001.jpg": [ {"t": "...", "c": 0.93, "x": .., "y": .., "w": .., "h": ..}, ... ] }
// x/y/w/h são frações do quadro, com y medido de baixo para cima (padrão do Vision).
import Foundation
import Vision
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("uso: ocr_vision <pasta> <saida.json>\n".data(using: .utf8)!)
    exit(2)
}
let pasta = args[1], saida = args[2]
let fm = FileManager.default
guard let nomes = try? fm.contentsOfDirectory(atPath: pasta).filter({ $0.hasSuffix(".jpg") }).sorted() else {
    FileHandle.standardError.write("pasta ilegível\n".data(using: .utf8)!)
    exit(2)
}
var out: [String: [[String: Any]]] = [:]
for nome in nomes {
    let url = URL(fileURLWithPath: pasta + "/" + nome)
    guard let img = NSImage(contentsOf: url),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
    let req = VNRecognizeTextRequest()
    req.recognitionLevel = .accurate          // .fast perde palavra curta ("SAIR")
    req.usesLanguageCorrection = false
    req.recognitionLanguages = ["pt-BR", "en-US"]
    try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
    var itens: [[String: Any]] = []
    for r in (req.results ?? []) {
        guard let c = r.topCandidates(1).first else { continue }
        let b = r.boundingBox
        itens.append(["t": c.string, "c": c.confidence,
                      "x": b.minX, "y": b.minY, "w": b.width, "h": b.height])
    }
    out[nome] = itens
}
let data = try! JSONSerialization.data(withJSONObject: out)
try! data.write(to: URL(fileURLWithPath: saida))
print("ok \(nomes.count)")

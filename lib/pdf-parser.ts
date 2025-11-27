export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)

  // Simple PDF text extraction - reads text streams from PDF
  // This handles basic PDFs; complex PDFs may need pdfjs-dist library
  let text = ""
  let inTextObject = false
  let currentText = ""

  for (let i = 0; i < uint8Array.length; i++) {
    const char = String.fromCharCode(uint8Array[i])

    // Look for text object markers
    if (char === "B" && String.fromCharCode(uint8Array[i + 1]) === "T") {
      inTextObject = true
      i += 1
    } else if (char === "E" && String.fromCharCode(uint8Array[i + 1]) === "T") {
      inTextObject = false
      if (currentText) {
        text += currentText + "\n"
        currentText = ""
      }
      i += 1
    } else if (inTextObject && char === "T" && String.fromCharCode(uint8Array[i + 1]) === "j") {
      // Extract text between parentheses
      let j = i + 2
      while (j < uint8Array.length && String.fromCharCode(uint8Array[j]) !== "(") j++
      j++

      while (j < uint8Array.length && String.fromCharCode(uint8Array[j]) !== ")") {
        const c = String.fromCharCode(uint8Array[j])
        if (c.charCodeAt(0) > 31 && c.charCodeAt(0) < 127) {
          currentText += c
        }
        j++
      }
      i = j
    }
  }

  return text || extractFallbackPDFText(uint8Array)
}

function extractFallbackPDFText(uint8Array: Uint8Array): string {
  // Fallback: extract readable strings from PDF
  let text = ""
  let currentString = ""

  for (let i = 0; i < uint8Array.length; i++) {
    const char = String.fromCharCode(uint8Array[i])

    if (char.charCodeAt(0) > 31 && char.charCodeAt(0) < 127 && char !== "<" && char !== ">") {
      currentString += char
    } else {
      if (currentString.length > 3) {
        text += currentString + " "
      }
      currentString = ""
    }
  }

  return text
}

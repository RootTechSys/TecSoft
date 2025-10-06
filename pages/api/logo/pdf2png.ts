import type { NextApiRequest, NextApiResponse } from 'next'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js'
const { createCanvas } = require('canvas')

// Necessário para ler em ambiente server
(pdfjs as any).GlobalWorkerOptions.workerSrc =
  'pdfjs-dist/legacy/build/pdf.worker.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const src = String(req.query.src || '')
    if (!src || !src.endsWith('.pdf')) {
      res.status(400).send('Parâmetro src inválido')
      return
    }

    // Pode ser URL absoluta (S3/CDN) ou caminho público do Next (/public/...)
    const isAbsolute = /^https?:\/\//i.test(src)
    const url = isAbsolute ? src : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${src}`

    const doc = await (pdfjs as any).getDocument({ url }).promise
    const page = await doc.getPage(1)

    // 2x para ficar nítido em retina
    const viewport = page.getViewport({ scale: 2 })
    const canvas = createCanvas(viewport.width, viewport.height)
    const ctx = canvas.getContext('2d')

    await page.render({ canvasContext: ctx, viewport }).promise

    const png = canvas.toBuffer('image/png')

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    res.status(200).send(png)
  } catch (e) {
    // fallback: placeholder
    res.status(500).send('Falha ao converter PDF')
  }
}

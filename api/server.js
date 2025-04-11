// api/server.js

let dados = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        data.data_envio = new Date().toISOString();
        dados.push(data);
        res.status(200).json({ status: 'OK', recebido: data });
      } catch (err) {
        res.status(400).json({ error: 'JSON inválido' });
      }
    });
  } else if (req.method === 'GET') {
    res.status(200).json(dados);
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}

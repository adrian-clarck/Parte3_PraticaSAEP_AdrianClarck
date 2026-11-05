const crypto = require('crypto');

function obterChave() {
    const segredo = process.env.CPF_ENCRYPTION_KEY;

    if (!segredo) {
        throw new Error('Configure CPF_ENCRYPTION_KEY no arquivo .env');
    }

    return crypto.createHash('sha256').update(segredo).digest();
}

function criptografar(cpf) {
    const iv = crypto.randomBytes(12);
    const cifra = crypto.createCipheriv('aes-256-gcm', obterChave(), iv);
    const textoCriptografado = Buffer.concat([
        cifra.update(cpf, 'utf8'),
        cifra.final()
    ]);

    return Buffer.concat([iv, cifra.getAuthTag(), textoCriptografado]).toString('base64');
}

function descriptografar(cpfCriptografado) {
    const dados = Buffer.from(cpfCriptografado, 'base64');

    // Mantém a leitura dos CPFs antigos que ainda estão em texto puro no banco.
    if (dados.length < 28) {
        return cpfCriptografado;
    }

    const decifra = crypto.createDecipheriv(
        'aes-256-gcm',
        obterChave(),
        dados.subarray(0, 12)
    );
    decifra.setAuthTag(dados.subarray(12, 28));
    const texto = Buffer.concat([
        decifra.update(dados.subarray(28)),
        decifra.final()
    ]);

    return texto.toString('utf8');
}

module.exports = { criptografar, descriptografar };

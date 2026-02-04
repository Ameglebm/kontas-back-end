Ajustar Muitas chamas assincronas, analisar observe pattents ou RabbitMQ
Sair da cota, kkk só pagando!!!...
Model contas:
    contas:
    - Criador da conta pode convidar qualquer morador da republica
    Os moradores que dividirem a conta vao ter o status, Pago verde, pendente em laranja(Obs quando criar conta ja fica com pendente)
    atrasada como vermelha.
    - O participante da conta vai dar como pago e o status vai para o criador da conta, e la vai como pendente, assim que ele confirmar vai ser valor True e assim que ele apertar nao pago vai dar como false e o partipante vai receber uma notificação (Entre em contato com o criador da conta e etc.)
    - A partir do momento que o criador da conta dar todos os status pagos vai uma notificação para o dono da republica confirmar ou nao e o status vai pendente
    - Criação da conta:
        divisao igual
        divisao persinalizada
        adiciona moradores para conta
    - Criar Patch update para atualizar conta e somente o admin da conta pode atualizar
    - verifiacar se vai colocar divisao da conta com morador aqui
    valores customizados
    - Decide quem entra na conta, ele convida os moradores
    - valores da conta
        descricao: data.descricao,
        valor: data.valor,
        vencimento: data.vencimento,
        status: data.status ?? StatusConta.PENDENTE,
        divisao da conta (personalizado ou igual)
        parcela da conta(mesma regra de adiconar as pessoas) ja entra nos meses e com os valores automaticamente, a pessoa pagou a conta e ela pode pagar as contas em qualquer momento
        republicaId: data.republicaId,
        criadoPorId: admin.id, 
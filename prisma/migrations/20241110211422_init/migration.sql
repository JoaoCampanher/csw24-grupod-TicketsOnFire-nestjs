-- CreateTable
CREATE TABLE "Tenant" (
    "TenantID" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "InformacoesDeContato" TEXT NOT NULL,
    "ConfiguracoesEspecificas" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("TenantID")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "UserID" SERIAL NOT NULL,
    "TenantID" INTEGER NOT NULL,
    "Nome" TEXT NOT NULL,
    "Email" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Evento" (
    "EventoID" SERIAL NOT NULL,
    "TenantID" INTEGER NOT NULL,
    "NomeDoEvento" TEXT NOT NULL,
    "Tipo" TEXT NOT NULL,
    "Localizacao" TEXT NOT NULL,
    "DataEHora" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("EventoID")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "TicketID" SERIAL NOT NULL,
    "EventoID" INTEGER NOT NULL,
    "TenantID" INTEGER NOT NULL,
    "PrecoOriginal" DOUBLE PRECISION NOT NULL,
    "IDDoVendedor" INTEGER NOT NULL,
    "CodigoUnicoDeVerificacao" TEXT NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("TicketID")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "TransacaoID" SERIAL NOT NULL,
    "TenantID" INTEGER NOT NULL,
    "IDDoComprador" INTEGER NOT NULL,
    "IDDoTicket" INTEGER NOT NULL,
    "PrecoDeVenda" DOUBLE PRECISION NOT NULL,
    "DataDaTransacao" TIMESTAMP(3) NOT NULL,
    "StatusDaTransacao" TEXT NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("TransacaoID")
);

-- CreateTable
CREATE TABLE "PreferenciasDeNotificacao" (
    "PreferenciasID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "ReceberEmails" BOOLEAN NOT NULL,

    CONSTRAINT "PreferenciasDeNotificacao_pkey" PRIMARY KEY ("PreferenciasID")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "AvaliacaoID" SERIAL NOT NULL,
    "IdDoVendedor" INTEGER NOT NULL,
    "IdDoComprador" INTEGER NOT NULL,
    "Nota" INTEGER NOT NULL,
    "Comentario" TEXT NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("AvaliacaoID")
);

-- CreateTable
CREATE TABLE "Sample" (
    "SampleID" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("SampleID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Transacao_IDDoTicket_key" ON "Transacao"("IDDoTicket");

-- CreateIndex
CREATE UNIQUE INDEX "PreferenciasDeNotificacao_UserID_key" ON "PreferenciasDeNotificacao"("UserID");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_TenantID_fkey" FOREIGN KEY ("TenantID") REFERENCES "Tenant"("TenantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_TenantID_fkey" FOREIGN KEY ("TenantID") REFERENCES "Tenant"("TenantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_EventoID_fkey" FOREIGN KEY ("EventoID") REFERENCES "Evento"("EventoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_TenantID_fkey" FOREIGN KEY ("TenantID") REFERENCES "Tenant"("TenantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_IDDoVendedor_fkey" FOREIGN KEY ("IDDoVendedor") REFERENCES "Usuario"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_TenantID_fkey" FOREIGN KEY ("TenantID") REFERENCES "Tenant"("TenantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_IDDoComprador_fkey" FOREIGN KEY ("IDDoComprador") REFERENCES "Usuario"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_IDDoTicket_fkey" FOREIGN KEY ("IDDoTicket") REFERENCES "Ticket"("TicketID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferenciasDeNotificacao" ADD CONSTRAINT "PreferenciasDeNotificacao_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Usuario"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_IdDoVendedor_fkey" FOREIGN KEY ("IdDoVendedor") REFERENCES "Usuario"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_IdDoComprador_fkey" FOREIGN KEY ("IdDoComprador") REFERENCES "Usuario"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

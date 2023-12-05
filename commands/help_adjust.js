const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const db = require("croxydb");
module.exports = {
    name: "help_adjust",
    description: "You can install the ticket system!",
    type: 1,
    options: [
        {
            name: "kanal",
            description: "Select the channel!",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "log",
            description: "Select the log channel!",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "yetkili",
            description: "Choose an official!",
            type: 8,
            required: true
        }
    ],
    run:async(client,interaction) => {
        const yetki1 = new EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: "Failed" })
        .setDescription("You must have `Administrator` permission to use this command!")
        if(!PermissionsBitField.Flags.Administrator) return interaction.reply({
            embeds: [yetki1],
            ephemeral: true
        });
        const kanal = interaction.options.getChannel("kanal");
        const log = interaction.options.getChannel("log");
        const yetkili = interaction.options.getRole("yetkili");
        if(db.get(`ticketSistemi_${interaction.guild.id}`)) {
            const embed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: "It's Already Set 🎫" })
            .setDescription(`The ticket system is already set up!`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "To reset: /ticket_close" })
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        } else {
            const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: "Successful 🎫" })
            .setDescription(`Ticket sistemi başarıyla ayarlandı!\n\nChannel: ${kanal}\nLog: ${log}\nAuthority: ${yetkili}`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "To reset: /ticket_close" })
            interaction.reply({
                embeds: [embed]
            })
            const embed2 = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: "Tickets" })
            .setDescription(`You can create a __support__ request by pressing the button below!`)   
            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("Create Support")
                .setEmoji("🎟️")
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("ticket_olustur")
            )
            kanal.send({
                embeds: [embed2],
                components: [button]
            })
            db.set(`ticketSistemi_${interaction.guild.id}`, { log: log.id, yetkili: yetkili.id })
        }
    }
}
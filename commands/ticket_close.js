const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "ticket_close",
    description: "You reset the ticket system!",
    type: 1,
    options: [],
    run:async(client,interaction) => {
        if(db.get(`ticketSistemi_${interaction.guild.id}`)) {
            db.delete(`ticketSistemi_${interaction.guild.id}`)
            db.delete(`ticketSıra_${interaction.guild.id}`)
            const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: "Successful" })
            .setDescription(`I successfully reset the ticket system!`)
            interaction.reply({
                embeds: [embed]
            })
        } else {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ name: "Error" })
                    .setDescription(`The ticket system is not already installed!`)
                    .setFooter({ text: "To set up: /help_adjust" })
                ]
            })
        }
    }
}
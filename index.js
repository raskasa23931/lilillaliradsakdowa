const { Client, GatewayIntentBits, PermissionFlagsBits, SlashCommandBuilder, REST, Routes, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// =====================
// ROLE HIERARCHY STRINOVA
// =====================
const STRINOVA_ROLES = [
  {
    name: '👑 Bai Mo — Guild Leader',
    color: '#FFD700',
    hoist: true,
    permissions: [PermissionFlagsBits.Administrator],
    mentionable: true,
  },
  {
    name: '🔴 P.U.S. Commander',
    color: '#E53935',
    hoist: true,
    permissions: [
      PermissionFlagsBits.ManageChannels,
      PermissionFlagsBits.ManageRoles,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers,
      PermissionFlagsBits.MuteMembers,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
    ],
    mentionable: true,
  },
  {
    name: '✂️ Scissors Operative',
    color: '#7B1FA2',
    hoist: true,
    permissions: [
      PermissionFlagsBits.ManageChannels,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
    ],
    mentionable: true,
  },
  {
    name: '🏙️ Urbino Broker',
    color: '#1565C0',
    hoist: true,
    permissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.AttachFiles,
    ],
    mentionable: true,
  },
  {
    name: '🛡️ Sentinel',
    color: '#00897B',
    hoist: true,
    permissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.AttachFiles,
    ],
    mentionable: false,
  },
  {
    name: '⚔️ Duelist',
    color: '#F4511E',
    hoist: true,
    permissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
    ],
    mentionable: false,
  },
  {
    name: '🌀 Vanguard',
    color: '#039BE5',
    hoist: true,
    permissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
    ],
    mentionable: false,
  },
  {
    name: '💚 Support',
    color: '#43A047',
    hoist: true,
    permissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
    ],
    mentionable: false,
  },
  {
    name: '🔮 Controller',
    color: '#8E24AA',
    hoist: true,
    permissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
    ],
    mentionable: false,
  },
  {
    name: '💎 Crystalline',
    color: '#B0BEC5',
    hoist: true,
    permissions: [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
    ],
    mentionable: false,
  },
];

// =====================
// SLASH COMMANDS
// =====================
const commands = [
  new SlashCommandBuilder()
    .setName('setup-roles')
    .setDescription('Setup semua role Strinova di server ini')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName('give-role')
    .setDescription('Kasih role Strinova ke member')
    .addUserOption(opt => opt.setName('user').setDescription('Pilih member').setRequired(true))
    .addStringOption(opt =>
      opt.setName('role')
        .setDescription('Pilih role')
        .setRequired(true)
        .addChoices(
          { name: '👑 Bai Mo — Guild Leader', value: '👑 Bai Mo — Guild Leader' },
          { name: '🔴 P.U.S. Commander', value: '🔴 P.U.S. Commander' },
          { name: '✂️ Scissors Operative', value: '✂️ Scissors Operative' },
          { name: '🏙️ Urbino Broker', value: '🏙️ Urbino Broker' },
          { name: '🛡️ Sentinel', value: '🛡️ Sentinel' },
          { name: '⚔️ Duelist', value: '⚔️ Duelist' },
          { name: '🌀 Vanguard', value: '🌀 Vanguard' },
          { name: '💚 Support', value: '💚 Support' },
          { name: '🔮 Controller', value: '🔮 Controller' },
          { name: '💎 Crystalline', value: '💎 Crystalline' },
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  new SlashCommandBuilder()
    .setName('remove-role')
    .setDescription('Hapus role Strinova dari member')
    .addUserOption(opt => opt.setName('user').setDescription('Pilih member').setRequired(true))
    .addStringOption(opt =>
      opt.setName('role')
        .setDescription('Pilih role yang mau dihapus')
        .setRequired(true)
        .addChoices(
          { name: '👑 Bai Mo — Guild Leader', value: '👑 Bai Mo — Guild Leader' },
          { name: '🔴 P.U.S. Commander', value: '🔴 P.U.S. Commander' },
          { name: '✂️ Scissors Operative', value: '✂️ Scissors Operative' },
          { name: '🏙️ Urbino Broker', value: '🏙️ Urbino Broker' },
          { name: '🛡️ Sentinel', value: '🛡️ Sentinel' },
          { name: '⚔️ Duelist', value: '⚔️ Duelist' },
          { name: '🌀 Vanguard', value: '🌀 Vanguard' },
          { name: '💚 Support', value: '💚 Support' },
          { name: '🔮 Controller', value: '🔮 Controller' },
          { name: '💎 Crystalline', value: '💎 Crystalline' },
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  new SlashCommandBuilder()
    .setName('role-list')
    .setDescription('Tampilkan daftar semua role Strinova dan keterangannya'),

  new SlashCommandBuilder()
    .setName('setup-channels')
    .setDescription('Setup channel default bertema Strinova')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
];

// =====================
// BOT READY
// =====================
client.once('ready', async () => {
  console.log(`✅ Bot aktif sebagai ${client.user.tag}`);

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  try {
    console.log('🔄 Mendaftarkan slash commands...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands.map(c => c.toJSON()) }
    );
    console.log('✅ Slash commands berhasil didaftarkan!');
  } catch (err) {
    console.error('❌ Gagal daftarkan commands:', err);
  }
});

// =====================
// HANDLE COMMANDS
// =====================
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, guild } = interaction;

  // --- /setup-roles ---
  if (commandName === 'setup-roles') {
    await interaction.deferReply({ ephemeral: true });
    let created = 0;
    let skipped = 0;

    for (const roleData of STRINOVA_ROLES) {
      const existing = guild.roles.cache.find(r => r.name === roleData.name);
      if (existing) { skipped++; continue; }

      await guild.roles.create({
        name: roleData.name,
        color: roleData.color,
        hoist: roleData.hoist,
        permissions: roleData.permissions,
        mentionable: roleData.mentionable,
        reason: 'Setup role Strinova'
      });
      created++;
    }

    await interaction.editReply({
      content: `✅ Setup selesai!\n✨ **${created}** role dibuat\n⏭️ **${skipped}** role sudah ada (diskip)`
    });
  }

  // --- /give-role ---
  if (commandName === 'give-role') {
    const targetUser = interaction.options.getUser('user');
    const roleName = interaction.options.getString('role');
    const member = await guild.members.fetch(targetUser.id);
    const role = guild.roles.cache.find(r => r.name === roleName);

    if (!role) {
      return interaction.reply({ content: `❌ Role **${roleName}** belum ada. Jalankan **/setup-roles** dulu!`, ephemeral: true });
    }

    await member.roles.add(role);
    await interaction.reply({
      content: `✅ <@${targetUser.id}> sekarang punya role **${roleName}**!`,
    });
  }

  // --- /remove-role ---
  if (commandName === 'remove-role') {
    const targetUser = interaction.options.getUser('user');
    const roleName = interaction.options.getString('role');
    const member = await guild.members.fetch(targetUser.id);
    const role = guild.roles.cache.find(r => r.name === roleName);

    if (!role) {
      return interaction.reply({ content: `❌ Role **${roleName}** tidak ditemukan.`, ephemeral: true });
    }

    await member.roles.remove(role);
    await interaction.reply({
      content: `✅ Role **${roleName}** berhasil dihapus dari <@${targetUser.id}>`,
    });
  }

  // --- /role-list ---
  if (commandName === 'role-list') {
    const embed = new EmbedBuilder()
      .setTitle('🎮 Strinova — Daftar Role & Faction')
      .setColor('#1565C0')
      .setDescription('Hierarki role dan faction di server ini:')
      .addFields(
        { name: '👑 Bai Mo — Guild Leader', value: 'Administrator penuh — Pemimpin Urbino', inline: false },
        { name: '🔴 P.U.S. Commander', value: 'Painting Utopia Security — Manage Channels, Roles, Kick, Ban', inline: false },
        { name: '✂️ Scissors Operative', value: 'The Scissors — Manage Channels & Messages', inline: false },
        { name: '🏙️ Urbino Broker', value: 'Urbino Alliance — Send Messages, Attach Files', inline: false },
        { name: '🛡️ Sentinel', value: 'Role bertahan — Michele, Audrey, Nobunaga, Leona', inline: false },
        { name: '⚔️ Duelist', value: 'Role serang — Ming, Flavia, Eika, Mara, Fuchsia, Bai Mo, Chiyo, Cielle', inline: false },
        { name: '🌀 Vanguard', value: 'Role breakthrough — Lawine, Kanami, Galatea', inline: false },
        { name: '💚 Support', value: 'Role pendukung — Celestia, Kokona, Fragrans', inline: false },
        { name: '🔮 Controller', value: 'Role kontrol — Maddelena, Yvette, Meredith, Reiichi, Yugiri', inline: false },
        { name: '💎 Crystalline', value: 'Member baru — belum diverifikasi', inline: false },
      )
      .setFooter({ text: 'Strinova Discord Bot • Switch between 2D and 3D!' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }

  // --- /setup-channels ---
  if (commandName === 'setup-channels') {
    await interaction.deferReply({ ephemeral: true });

    const categories = [
      {
        name: '📋 INFORMASI',
        channels: ['📢│pengumuman', '📜│peraturan', '🤖│bot-commands']
      },
      {
        name: '💬 STRINOVA HQ',
        channels: ['💬│obrolan-umum', '🎮│strinova-discussion', '🎨│fan-art', '😂│meme-zone']
      },
      {
        name: '🔴 P.U.S. DIVISION',
        channels: ['🔴│pus-lounge', '🛡️│sentinel-channel', '🔮│controller-channel']
      },
      {
        name: '✂️ SCISSORS BASE',
        channels: ['✂️│scissors-lounge', '⚔️│duelist-channel', '🌀│vanguard-channel']
      },
      {
        name: '🏙️ URBINO DISTRICT',
        channels: ['🏙️│urbino-lounge', '💚│support-channel', '💼│broker-channel']
      },
      {
        name: '🎙️ VOICE ROOMS',
        channels: []
      },
    ];

    const voiceChannels = ['🎙️ Lobby', '🔴 P.U.S. Squad', '✂️ Scissors Squad', '🏙️ Urbino Squad'];

    let catCount = 0;
    let chanCount = 0;

    for (const cat of categories) {
      const existing = guild.channels.cache.find(c => c.name === cat.name && c.type === 4);
      let category;
      if (existing) {
        category = existing;
      } else {
        category = await guild.channels.create({ name: cat.name, type: 4 });
        catCount++;
      }

      for (const chName of cat.channels) {
        const alreadyExists = guild.channels.cache.find(c => c.name === chName);
        if (!alreadyExists) {
          await guild.channels.create({ name: chName, type: 0, parent: category.id });
          chanCount++;
        }
      }
    }

    // Voice channels
    const voiceCat = guild.channels.cache.find(c => c.name === '🎙️ VOICE ROOMS' && c.type === 4)
      || await guild.channels.create({ name: '🎙️ VOICE ROOMS', type: 4 });

    for (const vc of voiceChannels) {
      const exists = guild.channels.cache.find(c => c.name === vc && c.type === 2);
      if (!exists) {
        await guild.channels.create({ name: vc, type: 2, parent: voiceCat.id });
        chanCount++;
      }
    }

    await interaction.editReply({
      content: `✅ Channel setup selesai!\n📁 **${catCount}** kategori dibuat\n💬 **${chanCount}** channel dibuat`
    });
  }
});
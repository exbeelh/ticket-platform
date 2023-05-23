﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public partial class MyContext : DbContext
{
    public MyContext()
    {
    }

    public MyContext(DbContextOptions<MyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<AccountRole> AccountRoles { get; set; }

    public virtual DbSet<Attendee> Attendees { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<OrderStatus> OrderStatuses { get; set; }

    public virtual DbSet<Organizer> Organizers { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<TicketOrder> TicketOrders { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Accounts__B9BE370F4C98921E");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");

            entity.HasOne(d => d.User).WithOne(p => p.Account)
                .HasForeignKey<Account>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Accounts__user_i__5629CD9C");
        });

        modelBuilder.Entity<AccountRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Account___3213E83FE3F008F8");

            entity.ToTable("Account_Roles");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("account_id");
            entity.Property(e => e.RoleId).HasColumnName("role_id");

            entity.HasOne(d => d.Account).WithMany(p => p.AccountRoles)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Account_R__role___5BE2A6F2");

            entity.HasOne(d => d.Role).WithMany(p => p.AccountRoles)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Account_R__role___5CD6CB2B");
        });

        modelBuilder.Entity<Attendee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Attendee__3213E83FD866E001");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("code");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("last_name");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.TicketId).HasColumnName("ticket_id");

            entity.HasOne(d => d.Event).WithMany(p => p.Attendees)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("FK__Attendees__event__76969D2E");

            entity.HasOne(d => d.Order).WithMany(p => p.Attendees)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Attendees__code__75A278F5");

            entity.HasOne(d => d.Ticket).WithMany(p => p.Attendees)
                .HasForeignKey(d => d.TicketId)
                .HasConstraintName("FK__Attendees__ticke__778AC167");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3213E83F5E4AC1E8");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Slug)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("slug");
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Countrie__3213E83F3FAE8D41");

            entity.Property(e => e.Id)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Events__3213E83F96D580AC");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.EndDate)
                .HasColumnType("date")
                .HasColumnName("end_date");
            entity.Property(e => e.EndTime).HasColumnName("end_time");
            entity.Property(e => e.Image)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.IsPublish).HasColumnName("is_publish");
            entity.Property(e => e.Link)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("link");
            entity.Property(e => e.Note)
                .HasColumnType("text")
                .HasColumnName("note");
            entity.Property(e => e.OrganizerId).HasColumnName("organizer_id");
            entity.Property(e => e.Slug)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("slug");
            entity.Property(e => e.StartDate)
                .HasColumnType("date")
                .HasColumnName("start_date");
            entity.Property(e => e.StartTime).HasColumnName("start_time");
            entity.Property(e => e.StatusId).HasColumnName("status_id");
            entity.Property(e => e.Title)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.Type).HasColumnName("type");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Views).HasColumnName("views");

            entity.HasOne(d => d.Category).WithMany(p => p.Events)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Events__user_id__6D0D32F4");

            entity.HasOne(d => d.Organizer).WithMany(p => p.Events)
                .HasForeignKey(d => d.OrganizerId)
                .HasConstraintName("FK__Events__organize__6E01572D");

            entity.HasOne(d => d.User).WithMany(p => p.Events)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Events__user_id__6EF57B66");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Orders__3213E83FF9ABE273");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Amount)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("amount");
            entity.Property(e => e.BookingFee)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("booking_fee");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.IsCanceled).HasColumnName("is_canceled");
            entity.Property(e => e.IsPayment).HasColumnName("is_payment");
            entity.Property(e => e.OrderDate)
                .HasColumnType("date")
                .HasColumnName("order_date");
            entity.Property(e => e.OrderStatusId).HasColumnName("order_status_id");
            entity.Property(e => e.TransationId)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("transation_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.OrderStatus).WithMany(p => p.Orders)
                .HasForeignKey(d => d.OrderStatusId)
                .HasConstraintName("FK__Orders__order_st__5FB337D6");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Orders__user_id__60A75C0F");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Order_It__3213E83F58BFF3E6");

            entity.ToTable("Order_Items");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UnitBookingFee)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("unit_booking_fee");
            entity.Property(e => e.UnitPrice)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("unit_price");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Order_Ite__order__6754599E");
        });

        modelBuilder.Entity<OrderStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Order_St__3213E83FE4F6DC7F");

            entity.ToTable("Order_Statuses");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Organizer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Organize__3213E83F808B06D3");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.DescriptionStatus).HasColumnName("description_status");
            entity.Property(e => e.Facebook)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("facebook");
            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.Link)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("link");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Twitter)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("twitter");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Organizers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Organizer__user___6A30C649");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Payments__3213E83F46EA1C6D");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CheckAt)
                .HasColumnType("datetime")
                .HasColumnName("check_at");
            entity.Property(e => e.FileImg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("file_img");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.PaymentAt)
                .HasColumnType("datetime")
                .HasColumnName("payment_at");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Payments__order___6477ECF3");

            entity.HasOne(d => d.User).WithMany(p => p.Payments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Payments__check___6383C8BA");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3213E83F13DE6351");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Tickets__3213E83F0A41C6B4");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("price");
            entity.Property(e => e.QuantityAvaible).HasColumnName("quantity_avaible");
            entity.Property(e => e.QuantitySold).HasColumnName("quantity_sold");
            entity.Property(e => e.Type).HasColumnName("type");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Event).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("FK__Tickets__event_i__71D1E811");

            entity.HasOne(d => d.User).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Tickets__user_id__72C60C4A");
        });

        modelBuilder.Entity<TicketOrder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Ticket_O__3213E83F7102C4B9");

            entity.ToTable("Ticket_Orders");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.TicketId).HasColumnName("ticket_id");

            entity.HasOne(d => d.Order).WithMany(p => p.TicketOrders)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Ticket_Or__order__7B5B524B");

            entity.HasOne(d => d.Ticket).WithMany(p => p.TicketOrders)
                .HasForeignKey(d => d.TicketId)
                .HasConstraintName("FK__Ticket_Or__order__7A672E12");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83F647CD537");

            entity.HasIndex(e => e.PhoneNumber, "UQ__Users__57B514922D8D037B").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Users__AB6E616423209F88").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("city");
            entity.Property(e => e.CountryId)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("country_id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Firstname)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("firstname");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Lastname)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastname﻿");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phone_number﻿");
            entity.Property(e => e.Picture)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("picture");
            entity.Property(e => e.PostalCode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("postal_code");
            entity.Property(e => e.State)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("state");
            entity.Property(e => e.Website)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("website");

            entity.HasOne(d => d.Country).WithMany(p => p.Users)
                .HasForeignKey(d => d.CountryId)
                .HasConstraintName("FK__Users__country_i__534D60F1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
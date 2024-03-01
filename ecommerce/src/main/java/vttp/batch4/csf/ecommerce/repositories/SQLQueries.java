package vttp.batch4.csf.ecommerce.repositories;

public class SQLQueries {

    public static final String SQL_INSERT_ORDER = """
        insert into purchase_order(id, date, name, address, priority, comments, cart)
        values (?, ?, ?, ?, ?, ?, ?)
        """;

        // po_id int auto_increment,
        // id varchar(64) not null,
        // date timestamp default current_timestamp,
        // name varchar(64) not null,
        // address varchar(256) not null,
        // priority boolean,
        // comments varchar(256),
        // cart varchar(256) not null,

}

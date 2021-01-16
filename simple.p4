typedef bit<48>  EthernetAddress;
typedef bit<32>  IPv4Address;

header Ethernet_h {
    EthernetAddress dstAddr;
    EthernetAddress srcAddr;
    bit<16>         etherType;
}

struct Parsed_packet {
    Ethernet_h ethernet;
    IPv4_h     ip;
}
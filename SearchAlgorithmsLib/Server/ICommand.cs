﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Sockets;

namespace Server
{
    public interface ICommand
    {
        string Execute(string[] args, TcpClient client = null, Controller control = null);
    }
}

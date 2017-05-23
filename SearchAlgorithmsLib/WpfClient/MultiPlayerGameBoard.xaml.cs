﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace WpfClient
{
    /// <summary>
    /// Interaction logic for MultiPlayerGameBoard.xaml
    /// </summary>
    public partial class MultiPlayerGameBoard : Window
    {
        private string result;
        private TelnetMultiClient client;
        
        public MultiPlayerGameBoard(string result, TelnetMultiClient client)
        {
            this.result = result;
            this.client = client;
            InitializeComponent();
        }

        private void RestartGame_Click(object sender, RoutedEventArgs e)
        {

        }

        private void BackToMainMenu_Click(object sender, RoutedEventArgs e)
        {

        }

        private void Window_KeyDown(object sender, KeyEventArgs e)
        {

        }
    }
}
